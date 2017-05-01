angular.module('myApp.library', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('library', {
            url: '/library',
            templateUrl: 'views/library/library.html',
            controller: 'libCtrl'
        });
    }])
.controller('libCtrl', function($scope, $http) {
  $http.get(API +'/book')
        .then(function(response) {
		$scope.books = response.data;
	}, function (error){
                console.log('Error al obtener los libros: ' + error.data);
        });
});