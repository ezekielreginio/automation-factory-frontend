<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>1Export - Automation Factory</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link  href="{{ asset('plugins/fontawesome/css/all.min.css') }}" rel="stylesheet">
        
        <!-- Styles -->
        <link type="text/css" rel="stylesheet" href="https://cdn.1export.com/assets/bootstrap-4.6.0/css/bootstrap.min.css" async />
        <link rel="stylesheet" type="text/css" href="{{ asset('css/landing_page/index.min.css') }}" rel="stylesheet" type="text/css">
        
        @yield('additional_head_scripts')

        <script src="{{ asset('js/jquery.min.js') }}"></script>
        <script src="{{ asset('plugins/bootstrap/dist/js/bootstrap.min.js') }}" defer></script>
    </head>
    <body class="antialiased">
        <div id="app">
            @include('layouts.navbars.main')
            <div class="container-fluid mt-3">
                @yield('content')
            </div>
        </div>
        
    </body>
    @include('layouts.scripts.config')
    <script src="{{ asset('js/navbar/main_navbar.min.js') }}" defer></script>
    @yield('scripts')
</html>
