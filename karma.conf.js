module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'public/js/vendor.js',
            'app/app.js',
            'app/*.js',
            'app/**/*.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'tests/**/*.spec.js',
        ],

        preprocessors: {
            'app/**/*.js': 'coverage'
        },

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'lcov',
            dir: 'coverage'
        },

        browsers: ['PhantomJS'],

        singleRun: false

    });
}