/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.sidenav', ['ngRoute','ngMaterial', 'ngAnimate'])
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };

        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;

            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/sidenav', {
            templateUrl: 'views/leftsidenav.html',
            controller: 'LeftCtrl'
        });
    }])
    .controller('LeftCtrl', function ($scope, $http, $window) {
        if (localStorage.getItem("fs_web_token")) {
            console.log('Usuari dins el portal');
        }
        else {
            if (($window.location == "#!/register") || ($window.location == "#!/signup")) {
                console.log("Usuari que no ha iniciat sessió");
                $window.location = '/';
            }
            $scope.storageuser = null;
        }
    })
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });