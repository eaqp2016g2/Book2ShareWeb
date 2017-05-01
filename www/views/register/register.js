/**
 * Created by juan on 17/03/17.
 */
angular.module('myApp.register', ['ui.router', 'ui.validate'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'views/register/register.html',
            controller: 'RegisterController'
        });
    }])
    .controller('RegisterController', function ($scope, $http, $state, $q) {
        $http.get(API + '/users')
            .then(function (response) {
                $scope.users = response.data;
            }, function (error) {
                console.log('Error al obtener los usuarios: ' + error.data);
            });
        $scope.newUser = {};
        $scope.doesNotExist = function (value) {
            console.log($scope.users);
            return $q(function (resolve, reject) {
                for (const user of $scope.users) {
                    console.log(user.email + "/" + value);
                    if (user.email === value) {
                        var notexists = false;
                        reject();
                        break;
                    }
                    else {
                        var notexists = true;
                    }
                }
                if (notexists) {
                    resolve();
                }
            })
        };

        $scope.register = function () {
            if ($scope.newUser.password2 === $scope.newUser.password) {
                $http({
                    url: API + '/users/register',
                    method: "POST",
                    data: $scope.newUser
                })
                    .then(function (response) {
                            if (response.data.success == true) {
                                localStorage.setItem("fs_web_token", response.data.token);
                                localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                                $state.go("portal")
                            } else {
                                console.log("Ha fallat l'inici de sessió");
                            }
                        },
                        function (error) {
                            console.log('El correu electrònic està en ús' + error);
                        });
            }
            else {
                console.log("Les contrasenyes no coincideixen");
            }
        };
    });