<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;

class IsPermittedMiddleware
{
    /**
     * Handle an incoming request.
     * It handles all request type methods from POST, GET and etc.
     * 
     * - This middleware will check if the authenticated user is already verified themself in the platform.
     * - Also check if the sip_ut was valid.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     * 
     * @author Ezekiel Reginio <ezekiel@1export.com>
     */
    public function handle($request, Closure $next)
    {
        if ($request->hasCookie('sip_ut')) {
            $response = Http::withHeaders([
                'Authorization' => "Bearer " . $request->cookie('sip_ut'),
                'Accept'    => 'application/json'
            ])->get(config('api.baseUrl') . "/api/admin/auth/me");
            
            if ($response->status() !== 200) {
                return $this->forceLogout();
            }
            
            $responseData = $response->json()['user'];

            $isPermmited = $responseData['permitted'] == 1;

            if ($isPermmited) {
                return $next($request);
            }
            
            abort(403, "Sorry, your account has not yet been verified. Kindly check your email and complete your registration.");
        }
        return $this->forceLogout();
    }

    /**
     * Force to logout user with cookie
     *
     * @param  string $message
     * @return void
     */
    private function forceLogout(string $message = "Kindly login your account to access this page.") 
    {
        Cookie::queue(Cookie::forget('sip_ut'));
        return redirect('/');
    }
}
