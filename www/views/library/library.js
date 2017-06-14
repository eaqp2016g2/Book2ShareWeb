angular.module('myApp.library', ['ngMaterial', 'ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('library', {
            url: '/library',
            templateUrl: 'views/library/library.html',
            controller: 'libCtrl'
        });
    }])
    .controller('libCtrl', function ($scope, $http, $rootScope, $state, $mdDialog) {

        // Obtener todos los usuarios

        $http.get(API + '/users')
            .then(function (response) {
                $scope.users = response.data;
                $scope.getBooks();
            }, function (error) {
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        // Obtener todos los libros

        $scope.getBooks = function (){
            $http.get(API + '/book')
                .then(function (response) {
                    $scope.books = response.data;
                    $scope.books2 = orderBooks($scope.books);
                }, function (error) {
                    console.log('Error al obtener los libros: ' + error.data);
                });
        };

        function orderBooks(books2) {
            for (var book of books2) {
                $http.get(API + '/book/' + book._id + '/favorite')
                    .then(function (response) {
                        book.favorite = response.data;
                    }, function (error) {
                        console.log('Error al obtener los usuarios: ' + error.data);
                    });

                if (angular.isUndefined(book.user)) {
                    book.user = {
                        reader: "0"
                    };
                }
            }
            console.log(books2);
            return books2;
        }

        $scope.searchBook = function (book) {
            $rootScope.booksel = book;
            console.log("libro sel" + $rootScope.booksel);
            $state.go("bookDetail")
        };

        $scope.isFavorite = false;

        $scope.openChat = function (ev, user_id) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/library/composer.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {dataToPass: user_id},
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog';
                });

        };

        $scope.destinatari;

        function DialogController($scope, $mdDialog, dataToPass) {

            if (!angular.isUndefined(dataToPass)) {
                $scope.destinatari = dataToPass;
            }

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.markFavorite = function (book) {
            $http({
                url: API + '/book/' + book._id + "/favorite",
                method: "PUT"
            })
                .then(function (response) {
                        console.log(response);
                        book.favorite = true;
                    },
                    function (error) {
                        console.log(error);
                    });
        };

        $scope.unmarkFavorite = function (book) {
            console.log(book);
            $http({
                url: API + '/book/' + book._id + "/favorite",
                method: "DELETE"
            })
                .then(function (response) {
                        console.log(response.data);
                        book.favorite = false;
                        return false;
                    },
                    function (error) {
                        console.log(error);
                    });
        }
    });