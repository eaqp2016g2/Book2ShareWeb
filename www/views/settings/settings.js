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
    .controller('SettingsController', function ($scope, $http) {

        $scope.users = {};

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        $scope.data = {};
        $scope.data.cb1 = true;

        $scope.notifications = function (bool){
            console.log("ENTRA?");
                $http.put(API + '/notifications/' + bool)
                    .then(function (response){
                        console.log(response);
                    }, function (error) {
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
