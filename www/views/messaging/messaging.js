/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.messaging', ['ui.router'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('messaging', {
            url: '/messaging',
            templateUrl: 'views/messaging/messaging.html',
            controller: 'MessagingCtrl'
        });
    }])
    .controller('MessagingCtrl', function ($scope, $http, $filter, $mdDialog) {

        var userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));

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

        $scope.conversations = userdata.conversations;

        // Obtener todos los usuarios

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        // Obtener todos los mensajes de un usuario determinado

        var user_id = "590bec1e7ab5bb0e1f82dc04";
        $http.get(API +'/msg/' + user_id)
            .then(function(response) {
                $scope.conversation = response.data;
                $scope.conversation2=orderMessages($scope.conversation,user_id);
                //console.log($scope.conversation2);

            }, function (error){
                console.log('Error al obtener los mensajes: ' + error.data);
            });

        function orderMessages (conversation, user){
            conversation.user=user;
            for(var message of conversation){
                if(message.userA=userdata._id){
                    message.send="message sent";
                }
                else{
                    message.send="message received";
                }
            }
            return conversation;
        }

        $scope.newMessage={};

        $scope.sendMessage = function (destinatari) {
            if (($scope.newMessage.content != "") && ($scope.newMessage.content)) {
                //$scope.newMessage.userA = userdata._id;
                $scope.newMessage.userB = destinatari;
                $http({
                    url: API + '/msg',
                    method: "POST",
                    data: $scope.newMessage
                })
                    .then(function (data) {
                            console.log(data);
                            $scope.newMessage = {};
                        },
                        function () {
             //               toastr.error('Error a l\'enviar el missatge');
                        });
            }
        };
    });