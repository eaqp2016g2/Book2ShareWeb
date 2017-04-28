/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.book', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('book', {
            url:'/book',
            templateUrl: 'views/book/book.html',
            controller: 'BookController'
        });
    }]).controller('BookController', function ($scope, $http) {

});