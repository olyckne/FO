angular.module('app')
    .factory('FoaasService', ['$http', '$q', function($http, $q) {
        var baseUrl = 'http://www.foaas.com';
        var callUrl = function callUrl(url, shout) {
            var defer = $q.defer();
            url = buildUrl(url, shout);

            $http.get(url)
                .then(function(data, status, header, config) {
                    defer.resolve(data.data);
                }, function(data, status, header, config) {
                    defer.reject(data);
                });

            return defer.promise;
        };

        var operations = function operations() {
            return this.callUrl('/operations');
        };

        var buildUrl = function buildUrl(url, shout) {
            url  = baseUrl+url;
            url += shout ? "?shoutcloud" : "";

            return url;
        }

        var getPlaceholderKey = function getPlaceholderKey(key) {
            return ":"+key;
        }

        var switchPlaceholdersToRealValues = function switchPlaceholdersToRealValues(fields, textWithPlaceHolder) {
            var replaced = textWithPlaceHolder;
            angular.forEach(fields, function(value, key) {
                var placeholder = getPlaceholderKey(key);
                replaced = replaced.replace(placeholder, value);
            });

            return replaced;
        }

        return {
            callUrl: callUrl,
            getOperations: operations,
            getPlaceholderKey: getPlaceholderKey,
            switchPlaceholdersToRealValues: switchPlaceholdersToRealValues
        };
}]);