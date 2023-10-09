<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <link type="text/css" rel="stylesheet" href="https://cdn.1export.com/assets/bootstrap-4.6.0/css/bootstrap.min.css" async />
        <link rel="stylesheet" type="text/css" href="{{ asset('css/landing_page/index.min.css') }}" rel="stylesheet" type="text/css">
    </head>
    <body class="antialiased">
        <div id="app">
            <landing-page/>
        </div>

        <script src="{{ mix('js/app.js') }}"></script>
        <script type="text/javascript">
            window.apiBaseUrl = "{{ config('api.apiBaseUrl') }}";
            window.baseUrl = "{{ config('api.baseUrl') }}";
        </script>
    </body>
</html>
