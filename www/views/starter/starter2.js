
angular.module('myApp.starter', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('starter',{
            url:'/starter',
            templateUrl:'views/starter/starter.html',
            controller: 'StarterController'
        })
    })
    .controller('StarterController', function ($scope, $http) {

    });