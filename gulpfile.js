var gulp = require('gulp');
var elixir = require('laravel-elixir');
require('laravel-elixir-bower');
require('laravel-elixir-karma');

elixir(function(mix) {
    mix.bower()
        .scriptsIn('app', 'public/js/app.js')
        .karma({
            jsDir: ['app/**/*.js']
        });
});