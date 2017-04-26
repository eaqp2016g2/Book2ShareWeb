angular.module('myApp.sidenav', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('sidenav', {
            templateUrl: 'views/sidenav/sidenav.html',
            controller: 'sideCtrl'
        });
    }])
  .controller('sideCtrl', function ($scope, $timeout, $mdSidenav) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  });