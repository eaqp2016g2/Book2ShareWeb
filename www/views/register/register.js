/**
 * Created by juan on 17/03/17.
 */
var API = "http://localhost:3001/api/";

angular.module('myApp.register', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'RegisterController'
        });
    }])
    .controller('RegisterController', function ($scope, $http) {

        $scope.newUser = {};
        $scope.register = function () {
            $http({
                url: API + 'users/register',
                method: "POST",
                data: $scope.newUser
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
                        console.log('El correu electrònic està en ús' + error);
                    });
        };
    });