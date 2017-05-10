angular.module('myApp.advSearch', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('advSearch', {
            url: '/books/advSearch',
            templateUrl: 'views/advSearch/advSearch.html',
            controller: 'advSCtrl'
        });
    }])
.controller('advSCtrl', function ($scope, $http, $state, $rootScope) {
        
        $scope.searchTitle = function () {
            $rootScope.libros={};
             $http({
                url: API + '/book/search/title/' + $scope.title,                
                method: "GET",
                data: $scope.title
            })
                .then(function (response) {
                        if (response.data != null) {   
                            $scope.title={}
                            $rootScope.libros = response.data
                            $state.go("results")
                                                      
                        } else {
                            console.log("No hi ha cap llibre");
                        }
                    });
        };
        $scope.searchAuthor = function () {
            $rootScope.libros={};
             $http({
                url: API + '/book/search/author/' + $scope.author,                
                method: "GET",
                data: $scope.author
            })
                .then(function (response) {
                        if (response.data != null) {   

                            $rootScope.libros = response.data
                            $state.go("results")
                                                      
                        } else {
                            console.log("No hi ha cap llibre");
                        }
                    });
        };
        $scope.searchLanguage = function () {
            $rootScope.libros={};
             $http({
                url: API + '/book/search/language/' + $scope.language,                
                method: "GET",
                data: $scope.language
            })
                .then(function (response) {
                        if (response.data != null) {   

                            $rootScope.libros = response.data
                            $state.go("results")
                                                      
                        } else {
                            console.log("No hi ha cap llibre");
                        }
                    });
        };
        
    });