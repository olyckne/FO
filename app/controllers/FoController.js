angular.module('app')
    .controller('FoController', ['$scope', '$stateParams', '$location', 'FoaasService', function($scope, $stateParams, $location, $foaasService) {
        var foaasUrl = $stateParams.path;

        $scope.shout = false;
        $scope.selectedOperation = null;
        $scope.fuckOff = {};
        $scope.message = "";
        $scope.subtitle = "";
        $scope.operationFields = "";
        $scope.fields = {};
        $scope.currentUrl = "";

        var operations = $foaasService.getOperations().then(function(data) {
            operations = data;
            $scope.operations = operations;
            $scope.selectedOperation = operations[0];
            $scope.getOperationsFields();
        });

        $scope.getFuckOff = function getFuckOff() {
            var url = $scope.selectedOperation.url;
            url = $foaasService.switchPlaceholdersToRealValues($scope.fields, url);
            $scope.currentUrl = url;
            $foaasService.callUrl(url, $scope.shout)
                .then(function(data) {
                    $scope.fuckOff = data;
                    $scope.mapPlaceHoldersToInputs();
                }, function(data) {
                    $scope.fuckOff = {message: 'Something went wrong...'};
                });
        };

        $scope.mapPlaceHoldersToInputs = function mapPlaceHoldersToInputs() {
            if ( ! $scope.selectedOperation ) return;
            var message = $scope.fuckOff.message;
            var subtitle = $scope.fuckOff.subtitle;
            
            var fields = $scope.selectedOperation.fields;
            
            angular.forEach(fields, function(value, key) {

                var needle = $foaasService.getPlaceholderKey(value.field);
                message = message.replace(needle, "{{fields."+fields[key].field+"}}");
                subtitle = subtitle.replace(needle, "{{fields."+fields[key].field+"}}");
            });
            
            $scope.message = message;
            $scope.subtitle = subtitle.substring(2, subtitle.length);
        };

        $scope.getOperationsFields = function getOperationsFields() {
            if ( ! $scope.selectedOperation) return;

            var fields = $scope.selectedOperation.fields;
            var html = "";

            $scope.fields = {};
            angular.forEach(fields, function (value, key) {
                $scope.fields[value.field] = $foaasService.getPlaceholderKey(value.field);

                html += '<div class="form-group">'+
                            '<label for="'+value.field+'">'+value.name+'</label>'+
                        '<input select-on-click ng-model="fields.'+value.field+'" id="'+value.field+'" class="form-control" type="text" name=":'+value.field+'">'+
                        '</div>';

            });

            $scope.operationFields = html;
            
            $scope.getFuckOff();
        }

        $scope.getShareLink = function getShareLink() {
            var url = "";
            if ( ! $scope.selectedOperation) return url;
            url = $location.absUrl()+"fuck"+$scope.selectedOperation.url;
            url = $foaasService.switchPlaceholdersToRealValues($scope.fields, url);
            url += $scope.shout ? "?shoutcloud" : "";

            return url;
        }

    }])
