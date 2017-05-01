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
    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
});