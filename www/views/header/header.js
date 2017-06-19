/**
 * Created by juan on 21/04/17.
 */

angular.module('myApp.header', ['ngMaterial', 'ngMessages'])
    .controller('HeaderCtrl', function DemoCtrl($mdDialog, $http, $scope, $mdColorPalette, $mdMenu, $interval) {
        var originatorEv;

        var userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.user = {};

        $interval(function() {
            getNotifications(userdata._id);
        }, 60*10*1000);


        function getNotifications(user_id) {
            $http.get(API + '/users/' + user_id)
                .then(function (response) {
                    $scope.user = response.data;
                    try {
                        $scope.primary = $scope.user.settings.colour.primario;
                        $scope.accent = $scope.user.settings.colour.secundario;
                    }
                    catch(err){
                        console.log(err);
                    }
                    console.log($scope.user.settings.allow_notifications);
                }, function (error) {
                    console.log('Error al obtener el usuario: ' + error.data);
                });
        }

        $scope.markRead = function (id) {
            $http.put(API + '/notifications/read/' + id)
                .then(function (response) {
                    console.log(response);
                    getNotifications(userdata._id);
                }, function (err) {
                    console.log('Error' + err.data);
                });
        };

        this.openMenu = function ($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        this.announceClick = function (index) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('You clicked!')
                    .textContent('You clicked the menu item at index ' + index)
                    .ok('Nice')
                    .targetEvent(originatorEv)
            );
            originatorEv = null;
        };

        $scope.colors = Object.keys($mdColorPalette);

        $scope.mdURL = 'https://material.google.com/style/color.html#color-color-palette';

        $scope.primary = 'blue';
        $scope.accent = 'cyan';

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

            console.log($scope.primary);
            console.log($scope.accent);

            var data = {
                primario: $scope.primary,
                accent: $scope.accent
            };

            $http.post(API + '/notifications/', data)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log('Error: ' + error);
                });

            window.location.reload();
        };
    });