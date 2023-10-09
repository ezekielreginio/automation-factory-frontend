const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

 /* JavaScript Mixins */
mix.scripts([
    'resources/js/scripts/MainNavbar.js',
], 'public/js/navbar/main_navbar.min.js')

/* CSS Mixins */
mix.styles([
    'resources/css/assets/colors.css',
    'resources/css/assets/typography.css',
    'resources/css/assets/main.css'
], 'public/css/landing_page/index.min.css');