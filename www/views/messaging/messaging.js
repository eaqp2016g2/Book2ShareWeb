/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.messaging', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/messaging', {
            templateUrl: 'views/messaging/messaging.html',
            controller: 'MessagingCtrl'
        });
    }])
    .controller('MessagingCtrl', function ($scope, $http, $routeParams, $filter,
                                           toastr) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_web_userdata"));

        $scope.showComposer = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/messaging/composer.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }


        $scope.selectedConversation = {};
        $scope.indexSelectedConversation;
        $scope.selectConversation = function (conv, indexConv) {
            console.log(conv);
            $scope.selectedConversation = conv;
            $scope.indexSelectedConversation = indexConv;
        };

        $scope.sendMessage = function () {
            if (($scope.newMessage.message != "") && ($scope.newMessage.message)) {
                $http({
                    url: API + 'msg/',
                    method: "POST",
                    data: $scope.newMessage
                })
                    .then(function (data) {
                            console.log(data);
                            $scope.conversations = data.data;
                            $scope.selectedConversation = $scope.conversations[$scope.indexSelectedConversation];
                            $scope.newMessage = {};
                        },
                        function () {
                            toastr.error('Error a l\'enviar el missatge');
                        });
            }
        };
    });