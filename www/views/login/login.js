/**
 * Created by juan on 10/04/17.
 */

var API = "http://localhost:3001/api/";

angular.module('myApp.login', ['ngMaterial'])

    .controller('LoginCtrl', function ($scope, $mdDialog, $http) {
        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/login/login.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        function DialogController($scope, $mdDialog) {
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

        $scope.actualUser = {};
        $scope.login = function () {
            $http({
                url: API + 'users/login',
                method: "POST",
                data: $scope.actualUser

            })
                .then(function (response) {
                        if (response.data.success == true) {
                            localStorage.setItem("fs_web_token", response.data.token);
                            localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                            window.location.reload();
                        } else {
                            console.log("Ha fallat l'inici de sessió");
                        }
                    },
                    function (error) {
                        console.log(error);
                    });
        };
    });