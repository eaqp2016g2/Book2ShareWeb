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
    }]).controller('BookController', function ($scope, $http, $rootScope) {
    $http.get(API +'/books/user/'+ $rootScope.userdata.name)
        .then(function(response) {
            $scope.books = response.data;
        }, function (error){
            console.log('Error al obtener los libros: ' + error.data);
        });

});