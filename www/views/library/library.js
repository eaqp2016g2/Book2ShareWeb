angular.module('myApp.library', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('library', {
            url: '/library',
            templateUrl: 'views/library/library.html',
            controller: 'libCtrl'
        });
    }])
.controller('libCtrl', function($scope, $http, $rootScope, $state) {

    // Obtener todos los usuarios

    $http.get(API +'/users')
        .then(function(response) {
            $scope.users = response.data;
            $scope.getMessages();
        }, function (error){
            console.log('Error al obtener los usuarios: ' + error.data);
        });

    // Obtener todos los libros

    $http.get(API +'/book')
        .then(function(response) {
		$scope.books = response.data;
	}, function (error){
                console.log('Error al obtener los libros: ' + error.data);
        });

    $scope.searchBook = function (book) {
        $rootScope.booksel=book;
        console.log("libro sel" + $rootScope.booksel)
        $state.go("bookDetail")
    }
});