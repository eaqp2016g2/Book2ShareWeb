/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.map', ['ui.router', 'ngMap'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('map', {
            url: '/map',
            templateUrl: 'views/map/map.html',
            controller: 'MapController'
        });
    }]).controller('MapController', function (NgMap, $scope, $http) {
    $scope.points = {};
    $http.get(API + '/loc')
        .then(function (response) {
            $scope.points = response.data;
        }, function (error) {
            console.log('Error al obtener los usuarios: ' + error.data);
        });

    var vm = this;
    vm.positions1 =[
        {pos:[40.11, -75.21],name:1}, {pos:[40.22, -75.10],name:2},
        {pos:[40.33, -74.99],name:3}, {pos:[40.44, -74.88],name:4},
        {pos:[40.55, -74.77],name:5}, {pos:[40.66, -74.66],name:6}];
    console.log(vm.positions1);
    console.log($scope.points);

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
    console.log(vm);
});