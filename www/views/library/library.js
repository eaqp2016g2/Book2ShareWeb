var API = "http://localhost:3001";

angular.module('myApp.library', ['ngMaterial', 'ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/library', {
            templateUrl: 'views/library/library.html',
            controller: 'libCtrl'
        });
    }])
.controller('libCtrl', function($scope, $http) {
  $http.get(API +'/books')
        .then(function(response) {
		$scope.libros = response.data;
	}, function (error){
                console.log('Error al obtener los libros: ' + error.data);
        });
})