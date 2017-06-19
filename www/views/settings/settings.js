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

        var userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.users = {};

        $scope.user = {};

        $http.get(API + '/users/' + userdata._id)
            .then(function (response) {
                $scope.user = response.data;
                console.log($scope.user.settings.allow_notifications);
                $scope.data.cb1 = $scope.user.settings.allow_notifications;
            }, function (error) {
                console.log('Error al obtener el usuario: ' + error.data);
            });

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        $scope.data = {};

        $scope.notifications = function (bool){
            console.log("ENTRA?");
                $http.put(API + '/notifications/' + bool)
                    .then(function (response){
                        console.log(response);
                        $scope.data.cb1 = bool;
                        $scope.user.settings.allow_notifications = bool;
                        window.location.reload();
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
