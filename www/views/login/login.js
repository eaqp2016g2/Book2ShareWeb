/**
 * Created by juan on 17/03/17.
 */
var API = "http://localhost:3001/";

angular.module('myApp.login', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginController'
        });
    }])
    .controller('LoginController', function ($scope, $http) {

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
                    function (response) {
                        console.log('El correu electrònic està en ús' + response);
                    });
        };

        // $scope.modificarPersona = function(newPersona) {
        //     $http.put(API + 'users/' + $scope.newPersona._id, $scope.newPersona)
        //         .then(function(response) {
        //             $scope.newPersona = {};
        //             $scope.personas = resposne.data;
        //             $scope.selected = false;
        //         }, function(error){
        //             console.log('Error: ' + error.data);
        //         });
        // };
        //
        // $scope.borrarPersona = function(newPersona) {
        //     $http.delete(API + 'users/' + $scope.newPersona._id)
        //         .then(function(response) {
        //             $scope.newPersona = {};
        //             $scope.personas = response.data;
        //             $scope.selected = false;
        //         },function(error){
        //             console.log('Error: ' + error.data);
        //
        //         });
        // };


    });