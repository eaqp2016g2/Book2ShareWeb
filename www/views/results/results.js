angular.module('myApp.results', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('results', {
            url: '/results',
            templateUrl: 'views/results/results.html',
            controller: 'resultsCtrl'
        });
    }])
    .controller('resultsCtrl', function($scope, $http, $rootScope, $state) {

        $scope.books=$rootScope.libros;
        $rootScope.libros={};

        $scope.searchBook = function (book) {
        $rootScope.booksel=book;
        console.log("libro sel" + $rootScope.booksel)
        $state.go("bookDetail")
    }

    })