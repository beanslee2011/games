angular.module('splatApp').controller('jump', ['$scope', '$window', function ($scope, $window) {
    $scope.redirectToGoogle = function () {
    	 alter("xxx");
        $window.open('https://www.google.com', '_blank');
    };
    });