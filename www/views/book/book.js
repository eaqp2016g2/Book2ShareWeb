/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.book', ['ui.router', 'ngMaterial'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('book', {
            url:'/book',
            templateUrl: 'views/book/book.html',
            controller: 'BookController'
        });
    }]).controller('BookController', function ($scope, $http) {
    $http.get(API +'/book')
        .then(function(response) {
            $scope.books = response.data;
        }, function (error){
            console.log('Error al obtener los libros: ' + error.data);
        });

});