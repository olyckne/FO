var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-bower');
require('laravel-elixir-karma');

elixir(function(mix) {
    mix.bower()
        .styles(['../bower_components/bootstrap/dist/css/bootstrap.min.css'], 
            'public/css/vendor.css'
        )
        .scriptsIn('app', 'public/js/app.js')
        .karma({
            jsDir: ['app/**/*.js']
        });
});