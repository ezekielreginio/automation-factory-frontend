<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        if ($request->hasCookie('sip_ut')) {
            $response = Http::withHeaders([
                'Authorization' => "Bearer " . $request->cookie('sip_ut'),
                'Accept'    => 'application/json'
            ])->post(config('api.baseUrl') . "/api/shipit/auth/me");

            if ($response->status() !== 200) {
                return $next($request);
            }

            $responseData = $response->json();

            $isPermmited = $responseData['permitted'] == 1;

            if ($isPermmited) {
                return redirect('/dashboard');
            }
            
            abort(403, "Sorry, your account has not yet been verified. Kindly check your email and complete your registration.");
        }

        return $next($request);
    }
}
