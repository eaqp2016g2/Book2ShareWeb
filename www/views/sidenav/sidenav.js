/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.sidenav', ['ngRoute', 'ngMaterial', 'ngAnimate'])
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
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
                timer = $timeout(function () {
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
            return debounce(function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            };
        }
    })
    .controller('LeftCtrl', function ($scope, $http, $window, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
        if (localStorage.getItem("fs_web_token")) {
            console.log('Usuari dins el portal');
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));
            $http.get(API + 'users/' + $scope.storageuser._id)
                .then(function (data) {
                    localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
                    $scope.storageuser = data.data;
                }, function (data, status) {
                    console.log('data error');
                    console.log(status);
                    console.log(data);
                })
                .then(function (result) {
                    //users = result.data;
                });
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
        if (localStorage.getItem("fs_web_token")) {
            console.log('Panell dret');
            $scope.toggleRight();
        }
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });