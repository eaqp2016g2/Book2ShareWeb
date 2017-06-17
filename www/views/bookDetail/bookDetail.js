angular.module('myApp.bookDetail', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bookDetail', {
            url: '/book/:bookId',
            templateUrl: 'views/bookDetail/bookDetail.html',
            controller: 'bookDetailCtrl'
        });
    }])
    .controller('bookDetailCtrl', function($scope, $http, $rootScope) {

        $scope.book=$rootScope.booksel;
        $rootScope.booksel={};

    });