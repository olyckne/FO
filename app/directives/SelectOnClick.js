angular.module('app')
.directive('selectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var focusedElement;
            element.on('click', function () {
                if (focusedElement != this) {
                    this.setSelectionRange(0, this.value.length);
                    focusedElement = this;
                }
            });
            element.on('blur', function () {
                focusedElement = null;
            });
        }
    };
})