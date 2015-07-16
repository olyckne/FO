angular.module('app')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
          $urlRouterProvider.otherwise("/");

          $stateProvider
            .state('/', {
                url: '/',
                controller: 'FoController as Fo',
                templateUrl: 'views/form.html'
            })
            .state('fuck', {
                url: '/fuck/*path?shoutcloud',
                controller: 'FuckOffController as Fo',
                templateUrl: 'views/fuckOff.html'
            })

}]);