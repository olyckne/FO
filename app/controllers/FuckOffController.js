angular.module('app')
    .controller('FuckOffController', ['$scope', '$stateParams', 'FoaasService', function ($scope, $stateParams, $foaasService) {

        $scope.path = $stateParams.path;
        $scope.shout = $stateParams.shoutcloud ? "?shoutcloud" : "";
        $scope.fuckOff = {};

        $foaasService.callUrl("/"+$scope.path+$scope.shout)
            .then(function (data) {
                $scope.fuckOff = data;
            }, function (data) {
                $scope.fuckOff = {message: 'Something went wrong...'}
            });

    }]);