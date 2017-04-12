/**
 * Created by juan on 03/04/17.
 */

angular.module('myApp.starter', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/starter', {
            templateUrl: 'views/starter/starter.html',
            controller: 'StarterController'
        });
    }])
    .controller('StarterController', function ($scope, $http) {

    });
