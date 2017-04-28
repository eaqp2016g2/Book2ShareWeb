/**
 * Created by juan on 21/03/17.
 */

angular.module('myApp.settings', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('settings', {
            url: '/settings',
            templateUrl: 'views/settings/settings.html',
            controller: 'SettingsController'
        });
    }])
    .controller('SettingsController', function ($scope, $http) {

    });