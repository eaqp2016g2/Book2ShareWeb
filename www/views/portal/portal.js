/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.portal', ['ui.router', 'ngMaterial', 'angular.filter'])
    .config(['$stateProvider', '$mdThemingProvider', function ($stateProvider, $mdThemingProvider) {
        $stateProvider.state('portal', {
            url: '/portal',
            templateUrl: 'views/portal/portal.html',
            controller: 'PortalCtrl'
        });
        $mdThemingProvider.theme('altTheme')
            .primaryPalette('purple');
    }])

    .controller('PortalCtrl', function ($scope, $http, $rootScope) {

        $scope.userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.imagePath = '/img/user-identity.svg';

        $http.get(API +'/book')
            .then(function(response) {
                $scope.books = response.data;
            }, function (error){
                console.log('Error al obtener los libros: ' + error.data);
            });

    });
