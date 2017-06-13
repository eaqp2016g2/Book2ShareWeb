/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.map', ['ui.router', 'ngMap'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('map', {
            url: '/map',
            templateUrl: 'views/map/map2.html',
            controller: 'MapController'
        });
    }]).controller('MapController', function (NgMap, $scope, $http, $rootScope, $state) {
        var vm = this;
    $scope.points = [];


    $http.get(API + '/intPoints')
        .then(function (response) {
            $scope.points = response.data;

            console.log("MAP CONTROLLER: puntos:", $scope.points)
        }, function (error) {
            console.log('Error al obtener los puntos: ' + error.data);
        });

    $scope.searchByPoint = function (point) {

            console.log("this",this.data);

            $rootScope.libros={};
            //$scope.point= point;
            console.log("punto: ", point)           
             $http({
                url: API + '/book/search/intpoint/' + this.data,                
                method: "GET"
            })
                .then(function (response) {
                        if (response.data != null) {   
                            console.log("id: " + this.data);
                            $rootScope.libros = response.data
                            $state.go("results")
                                                      
                        } else {
                            console.log("No hi ha cap llibre");
                        }
                    });
        }
    
    /*var vm = this;
    vm.positions1 =[
        {pos:[40.11, -75.21],name:1}, {pos:[40.22, -75.10],name:2},
        {pos:[40.33, -74.99],name:3}, {pos:[40.44, -74.88],name:4},
        {pos:[40.55, -74.77],name:5}, {pos:[40.66, -74.66],name:6}];

    vm.setPositions = function (pos) {
        vm.positions = angular.copy(pos);
    };
    NgMap.getMap().then(function (map) {
        vm.map = map;
    });
    vm.setPositions(vm.positions1);
    vm.currentIndex = 0;
    vm.selectNextCustomMarker = function () {
        vm.map.customMarkers[vm.currentIndex].removeClass('selected');
        vm.currentIndex = (vm.currentIndex + 1) % vm.positions.length;
        vm.map.customMarkers[vm.currentIndex].addClass('selected');
        vm.currentPosition = vm.positions[vm.currentIndex];
    };
    console.log(vm);*/
});