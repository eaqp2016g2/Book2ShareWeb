/**
 * Created by juan on 21/03/17.
 */

angular.module('myApp.settings', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('settings', {
            url: '/settings',
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsController'
        });
    }])
    .config(['$mdIconProvider', function($mdIconProvider) {
        $mdIconProvider.icon('md-close', '../../img/ic_close_24px.svg', 24);
    }])
    .controller('SettingsController', function ($scope, $http, $timeout, $q) {

        var self = this;

        self.fruitNames = ['Apple', 'Banana', 'Orange'];
        self.roFruitNames = angular.copy(self.fruitNames);
        self.editableFruitNames = angular.copy(self.fruitNames);

        $scope.users;
        $scope.genres;

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        $http.get(API +'/genres')
            .then(function(response) {
                $scope.genres = response.data;
                if($scope.genres[0]===null){
                    $scope.genres_exists=false;
                }
                else{
                    $scope.genres_exists=true;
                }
            }, function (error){
                console.log('Error al obtener los géneros: ' + error.data);
            });

        $scope.addGenre = function (genre) {
            $http.post(API + '/genres/')
                .then(function(response) {
                        $scope.genres = response;
                    }
                    , function (error){
                        console.log('Error: ' + error);
                    });

        };

        $scope.deleteGenre = function (genre) {
            $http.delete(API + '/genre/' + genre._id)
                .then(function(response) {
                        $scope.genres = response;
                    }
                    , function (error){
                        console.log('Error: ' + error);
                    });
        };

        $scope.deleteUser = function (user) {
                $http.delete(API + '/admin/' + user._id)
                    .then(function(response) {
                        $scope.users = response;
                    }
                    , function (error){
                        console.log('Error: ' + error);
                    });
        };
    });