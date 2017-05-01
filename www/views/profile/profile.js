angular.module('myApp.profile', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('profile', {
            url:'/users/:userid',
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        });
    }])
.controller('profileCtrl', function($scope, $http) {
        $scope.userdata =  JSON.parse(localStorage.getItem("fs_web_userdata"));
})