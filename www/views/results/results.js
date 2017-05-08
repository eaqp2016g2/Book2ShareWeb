angular.module('myApp.results', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('results', {
            url: '/results',
            templateUrl: 'views/results/results.html',
            controller: 'resultsCtrl'
        });
    }])
    .controller('resultsCtrl', function($scope, $http, $rootScope) {

        $scope.books=$rootScope.libros;
        //$rootScope.libros={};

    })