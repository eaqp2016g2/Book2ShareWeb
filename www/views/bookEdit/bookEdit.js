angular.module('myApp.publicar', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('publicar', {
            url: '/books/publicar',
            templateUrl: 'views/bookEdit/bookEdit.html',
            controller: 'publicarCtrl'
        });
    }])
.controller('publicarCtrl', function ($scope, $http, $state, $rootScope) {

        $scope.book = {};
        $scope.book.user=$rootScope.userdata._id
        console.log('book', $scope.book)

        $scope.publicar = function ($state) {
            $http({
                url: API + '/book',
                method: "POST",
                data: $scope.book
            })
                .then(function (response) {
                        if (response.data.success == true) {
                            $scope.book={};
                            //$state.go("library")
                        } else {
                            console.log("Ha fallat la publicació del llibre");
                        }
                    });
        };
    });