angular.module('myApp.bookDetail', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bookDetail', {
            url: '/book/:bookId',
            templateUrl: 'views/bookDetail/bookDetail.html',
            controller: 'bookDetailCtrl'
        });
    }])
    .controller('bookDetailCtrl', function($scope, $http, $rootScope) {
$http.get(API + '/users')
            .then(function (response) {
                $scope.users = response.data;
                //$scope.getBooks();
            }, function (error) {
                console.log('Error al obtener los usuarios: ' + error.data);
            });

            $http.get(API + '/intPoints')
            .then(function (response) {
                $scope.points = response.data;
                console.log("points: ", $scope.points)
                //$scope.getBooks();
            }, function (error) {
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        $scope.book=$rootScope.booksel;
        $rootScope.booksel={};

    })