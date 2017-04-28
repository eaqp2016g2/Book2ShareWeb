/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.map', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('map', {
            url: '/map',
            templateUrl: 'views/map/map.html',
            controller: 'MapController'
        });
    }]).controller('MapController', function ($scope, $http) {

});