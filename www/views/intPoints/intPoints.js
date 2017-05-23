angular.module('myApp.intPoints', ['ui.router', 'ngMaterial'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('intPoints', {
            url:'/intPoints',
            templateUrl: 'views/intPoints/intPoints.html',
            controller: 'intPointsCtrl'
        });
    }]).controller('intPointsCtrl', function ($scope, $http, $rootScope) {

    $scope.newPoint = function () {
            $http({
                url: API + '/intPoints',
                method: "POST",
                data: $scope.position, location
            })
                .then(function (response) {
                        if (response.data.success == true) {

                        } else {
                            console.log("Ha fallat la publicació del punt");
                        }
                    });
        };

});