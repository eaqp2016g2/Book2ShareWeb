/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.messaging', ['ui.router', 'angular.filter'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('messaging', {
            url: '/messaging',
            templateUrl: 'views/messaging/messaging.html',
            controller: 'MessagingCtrl'
        });
    }])
    .controller('MessagingCtrl', function ($scope, $http, $filter, $mdDialog) {

        var userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $scope.conversations = userdata.conversations;

        $scope.refreshConversations = function(user_id){
            $http.get(API +'/conversations/' + user_id)
                .then(function(response) {
                    localStorage.setItem("fs_web_userdata", JSON.stringify(response.data.user));
                    userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
                    $scope.conversations = userdata.conversations;
                }, function (error){
                    console.log('Error al obtener el usuario: ' + error.data);
                });
        };

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

        console.log(userdata.conversations[0]);
        // Obtener todos los usuarios

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
                $scope.getMessages(userdata.conversations[0]);
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });


        // Obtener todos los mensajes de un usuario determinado

        $scope.conversation = {};
        $scope.conversation2 = {};

        //console.log(conversation[0].user);

        $scope.getMessages = function (user_id) {
            //var user_id = "59132b36b8a222100c2aecb9";
            //var user_id = "590bec1e7ab5bb0e1f82dc04";
            $http.get(API + '/msg/' + user_id)
                .then(function (response) {
                    $scope.conversation = response.data;
                    $scope.conversation2 = orderMessages($scope.conversation, user_id);
                }, function (error) {
                    console.log('Error al obtener los mensajes: ' + error.data);
                });
            //console.log($scope.conversation);

            function orderMessages(conversation, user) {
                conversation.user = user;
                for (var message of conversation) {
                    if (message.userA === userdata._id) {
                        message.send = "message sent";
                        if(message.read === true){
                            message.tick= "../../img/msg-dblcheck-ack.svg";
                        }
                        else{
                            if(message.delivered === true){
                                message.tick = "../../img/msg-dblcheck.svg";
                            }
                            else{
                                message.tick = "../../img/msg-check.svg";
                            }
                        }
                    }
                    else {
                        message.send = "message received";
                    }
                }
                return conversation;
            }
            return $scope.conversation2;
        };

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
                            $scope.refreshConversations(userdata._id);
                            $scope.getMessages(destinatari);
                        },
                        function () {
             //               toastr.error('Error a l\'enviar el missatge');
                        });
            }
            $mdDialog.cancel();
        };
    });