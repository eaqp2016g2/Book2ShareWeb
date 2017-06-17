/**
 * Created by juan on 14/06/17.
 */
angular.module('myApp.facebook', ['ngMaterial', 'ui.router'])
    .controller('profileCtrl', function($scope, $http) {
        $scope.twitterLogin = function () {
            $http.get("http://www.google.com")
                .then(function (result) {
                    console.log(JSON.stringify(result));

                    $http.post(API + '/user/login/twitter', result)
                        .success(function (response) {
                            console.log(response);
                            $rootScope.UserID = response._id;
                            $rootScope.User = response;
                            window.localStorage.setItem("twitter", result.user_id);
                            $state.go('app.main');
                        })
                        .error(function (err) {
                            $ionicPopup.alert({
                                title: 'Error',
                                template: 'Usuario incorrecto'
                            });
                            console.log('Error: ' + err);
                        });

                }, function (error) {
                    alert("There was a problem getting your profile.  Check the logs for details.");
                    console.log(error);
                })
        }
    });
