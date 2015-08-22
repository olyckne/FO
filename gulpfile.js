var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-karma');

var scripts = [
    '../../../bower_components/angular/angular.min.js',
    '../../../bower_components/angular-ui-router/release/angular-ui-router.js',
    '../../../bower_components/angular-sanitize/angular-sanitize.js',
    '../../../bower_components/angular-bind-html-compile/angular-bind-html-compile.js',
    '../../../bower_components/angular-animate/angular-animate.js'
];

elixir(function(mix) {
    mix.scripts(scripts, 'public/js/vendor.js')
       .styles(['../../../bower_components/bootstrap/dist/css/bootstrap.min.css'],
            'public/css/vendor.css'
        )
        .scriptsIn('app', 'public/js/app.js')
        .karma({
            jsDir: ['app/**/*.js']
        });
});