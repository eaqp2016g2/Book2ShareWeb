angular.module('myApp.profile', ['ngMaterial', 'ui.router', 'ui.validate'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('profile', {
            url: '/users/:userid',
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        });
    }])
    .controller('profileCtrl', function ($scope, $http) {
        $scope.userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.newUser = {
            name: $scope.userdata.name,
            email: $scope.userdata.email,
            sex: $scope.userdata.sex,
            birthday: $scope.userdata.birthday,
            biography: $scope.userdata.biography
        };

        $scope.dt = new Date($scope.newUser.birthday);

        $scope.editUser = function (newUser) {
            $http.put(API+'/users/'+$scope.userdata._id, newUser).then(function(response) {

                $scope.newUser = {
                    name: response.data.name,
                    email: response.data.email,
                    sex: response.data.sex,
                    birthday: response.data.birthday,
                    biography: response.data.biography
                };
                console.log($scope.newUser);
            }, function (error) {
                console.log('Error al editar el usuario: ' + error.data);
            });
        }

    }).config(function ($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

});