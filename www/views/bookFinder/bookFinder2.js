angular.module('myApp.bookFinder2', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('finder2', {
            url: '/library/:title',
            templateUrl: 'views/bookFinder/bookFinder2.html',
            controller: 'finderCtrl2'
        });
    }])
.controller('finderCtrl2', function($scope, $http, $rootScope) {

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