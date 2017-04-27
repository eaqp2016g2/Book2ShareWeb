/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.sidenav', ['ui.router', 'ngMaterial', 'ngAnimate'])
    .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleLeft = buildDelayedToggler('left');

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
    .controller('SidenavController', function ($scope, $http, $window, $mdSidenav, $log) {
        $scope.close = function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });

        };
        // if (localStorage.getItem("fs_web_token")) {
        //     console.log('Usuari dins el portal');
        //     $scope.userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
        //     $http.get(API + 'users/' + $scope.userdata._id)
        //         .then(function (data) {
        //             localStorage.setItem("fs_web_userdata", JSON.stringify(data.data));
        //             $scope.userdata = data.data;
        //         }, function (data, status) {
        //             console.log('data error');
        //             console.log(status);
        //             console.log(data);
        //         })
        //         .then(function (result) {
        //             //users = result.data;
        //         });
        // }
        // else {
        //     if (($window.location == "#!/register") || ($window.location == "#!/signup")) {
        //         console.log("Usuari que no ha iniciat sessió");
        //         $window.location = '/';
        //     }
        //     $scope.userdata = null;
        // }
    });