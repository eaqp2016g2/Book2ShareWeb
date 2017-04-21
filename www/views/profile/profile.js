var API = "http://localhost:3001/api";

angular.module('myApp.profile', ['ngMaterial', 'ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users/:userid', {
            templateUrl: 'views/profile/profile.html',
            controller: 'proCtrl'
        });
    }])
.controller('proCtrl', function($scope, $http, $routeParams) {
  /*$http.get(API +'/users/'+ $routeParams.userid)
        .then(function(response) {        
        $scope.user={};
		$scope.user = response.data;
	}, function (error){
                console.log('Error al obtener el usuario: ' + error.data);
        });*/
        $scope.actualuser =  JSON.parse(localStorage.getItem("fs_web_userdata"));
})