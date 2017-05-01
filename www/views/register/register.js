/**
 * Created by juan on 17/03/17.
 */
angular.module('myApp.register', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'views/register/register.html',
            controller: 'RegisterController'
        });
    }])
    .controller('RegisterController', function ($scope, $http, $state) {

        $scope.newUser = {};
        $scope.register = function ($state) {
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
        };
    });