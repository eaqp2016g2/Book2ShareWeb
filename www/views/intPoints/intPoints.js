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
    /*var vm = this;
  NgMap.getMap().then(function(map) {
    console.log('map', map);
    vm.map = map;
  });*/

NgMap.getMap().then(function(map) {
    $scope.position={};

    map.addListener('click', function(e) {
       $scope.position.lat= e.latLng.lat();
       $scope.position.lng= e.latLng.lng();
        console.log("lat: "+ $scope.position.lat)
        console.log("lng: "+ $scope.position.lng)
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