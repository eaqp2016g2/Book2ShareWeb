var API = "http://localhost:3001/api";

angular.module('myApp.profile', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('profile', {
            url:'/users/:userid',
            templateUrl: 'views/profile/profile.html',
            controller: 'profileCtrl'
        });
    }])
.controller('profileCtrl', function($scope, $http) {
  /*$http.get(API +'/users/'+ $routeParams.userid)
        .then(function(response) {        
        $scope.user={};
		$scope.user = response.data;
	}, function (error){
                console.log('Error al obtener el usuario: ' + error.data);
        });*/
        $scope.actualuser =  JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.cambiar_avatar = function(){
            
        }

})