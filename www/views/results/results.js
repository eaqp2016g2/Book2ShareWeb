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
        
        $http.get(API + '/users')
            .then(function (response) {
                $scope.users = response.data;
                //$scope.getBooks();
            }, function (error) {
                console.log('Error al obtener los usuarios: ' + error.data);
            });


        $scope.searchBook = function (book) {
        $rootScope.booksel=book;
        console.log("libro sel" + $rootScope.booksel)
        $state.go("bookDetail")
        }

    })