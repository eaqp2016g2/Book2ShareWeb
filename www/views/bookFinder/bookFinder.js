angular.module('myApp.bookFinder', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('finder', {
            url: '/library/:title',
            templateUrl: 'views/bookFinder/bookFinder.html',
            controller: 'finderCtrl'
        });
    }])
.controller('finderCtrl', function($scope, $http, $rootScope) {

   $http({
                url: API + '/book/search/title/' + $rootScope.title,
                method: "GET",
                data: $rootScope.title
            })
                .then(function (response) {
                        if (response.data != null) {
                            $rootScope.title={};
                            $scope.books = response.data;
                            //$state.go("library")
                        } else {
                            console.log("No hi ha cap llibre");
                        }
                    });
});