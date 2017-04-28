var API = "http://localhost:3001/api";

angular.module('myApp.library', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('library', {
            url: '/library',
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
});