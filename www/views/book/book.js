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

    // Obtener todos los usuarios

    $http.get(API + '/users')
        .then(function (response) {
            $scope.users = response.data;
        }, function (error) {
            console.log('Error al obtener los usuarios: ' + error.data);
        });

    $http.get(API +'/books/user/'+ $rootScope.userdata._id)
        .then(function(response) {
            $scope.books = response.data;
        }, function (error){
            console.log('Error al obtener los libros: ' + error.data);
        });

    $scope.acceptLean = function (user_id, book_id){
        $http.put(API + '/book/' + book_id + '/lean/' + user_id)
            .then(function(response){
                console.log(response);
            },function(error){
                console.log('Error l\'acceptar el prèstec: ' + error.data);
            });
    };

    $scope.denyLean = function (user_id, book_id) {
        $http.delete(API + '/book/' + book_id + '/lean/' + user_id)
            .then(function(response){
                console.log(response);
            }, function (error) {
                console.log('Error al denegar el prèstec: ' + error.data);
            });

    };
});