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
            getOurBooks();
        }, function (error) {
            console.log('Error al obtener los usuarios: ' + error.data);
        });

    function getOurBooks() {
        $http.get(API + '/books/user/' + $rootScope.userdata._id)
            .then(function (response) {
                $scope.books = response.data;
            }, function (error) {
                console.log('Error al obtener los libros: ' + error.data);
            });
    }

    /*** KO ***/

    $scope.acceptLean = function (user_id, book_id){
        $http.put(API + '/book/' + book_id + '/lean/' + user_id)
            .then(function(response){
                console.log(response);
                getOurBooks();
            },function(error){
                console.log('Error a l\'acceptar el prèstec: ' + error.data);
            });
    };

    /*** OK  ***/

    $scope.denyLean = function (user_id, book_id) {
        $http.delete(API + '/book/' + book_id + '/lean/' + user_id)
            .then(function(response){
                if(response.data.ok === 1){
                    getOurBooks();
                }
            }, function (error) {
                console.log('Error al denegar el prèstec: ' + error.data);
            });

    };
});