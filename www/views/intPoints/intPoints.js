angular.module('myApp.intPoints', ['ui.router', 'ngMaterial', 'ngMap'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('intPoints', {
            url:'/intPoints',
            templateUrl: 'views/intPoints/intPoints.html',
            controller: 'intPointsCtrl'
        });
    }])
    .controller('intPointsCtrl', function ($scope, $http, NgMap, $rootScope) {
    //var vm = this;
   /* NgMap.getMap().then(function(map) {
      vm.map = map;
      console.log(map.getCenter().toJSON());     
      
    });*/

NgMap.getMap().then(function(map) {

    map.addListener('click', function(e) {
       $scope.positionlat= e.latLng.lat();
       $scope.positionlng= e.latLng.lng();
        console.log("lat: "+ $scope.positionlat)
        console.log("lng: "+ $scope.positionlng)
  });
    
});    

    

    $scope.newPoint = function () {
            $http({
                url: API + '/intPoints',
                method: "POST",
                data: $scope.position
            })
                .then(function (response) {
                        if (response.data.success == true) {
                            $scope.position={}

                        } else {
                            console.log("Ha fallat la publicació del punt");
                            $scope.position={}
                        }
                    });
        };

});