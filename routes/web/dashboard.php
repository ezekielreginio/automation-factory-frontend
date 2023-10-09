<?php

use Illuminate\Support\Facades\Route;
use Jenssegers\Agent\Agent;

/**
 *  Authenticated User Dashboard 
 * 
 *  Contains the authenticated dashboard routes for automation factory
 */

Route::group([
    'middleware' => ['is.permitted']
], function () {
    Route::get('/dashboard', function() {
        return view('dashboard.index');
    })->name('dashboard');
    
});
/** End User Dashboard */