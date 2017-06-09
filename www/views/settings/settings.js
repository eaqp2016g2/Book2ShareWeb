/**
 * Created by juan on 21/03/17.
 */

angular.module('myApp.settings', ['ui.router', 'ngMaterial'])
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
    .controller('SettingsController', function ($scope, $http, $mdColorPalette) {

        $scope.users = {};
        $scope.genres = {};
        $scope.genre = {};

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        $http.get(API +'/genre')
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
            $http.post(API + '/genre/', genre)
                .then(function(response) {
                        $scope.genres = response.data;
                    }
                    , function (error){
                        console.log('Error: ' + error);
                    });

        };

        $scope.deleteGenre = function (genre) {
            $http.delete(API + '/genre/' + genre._id)
                .then(function(response) {
                        $scope.genres = response.data;
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

        $scope.colors = Object.keys($mdColorPalette);

        $scope.mdURL = 'https://material.google.com/style/color.html#color-color-palette';
        $scope.primary = 'purple';
        $scope.accent = 'green';

        $scope.isPrimary = true;

        $scope.selectTheme = function (color) {
            if ($scope.isPrimary) {
                $scope.primary = color;

                $scope.isPrimary = false;
            }
            else {
                $scope.accent = color;

                $scope.isPrimary = true;
            }
        };
    });
