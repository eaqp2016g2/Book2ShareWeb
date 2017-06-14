/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.messaging', ['ui.router', 'angular.filter', 'ngMaterial'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('messaging', {
            url: '/messaging',
            templateUrl: 'views/messaging/messaging.html',
            controller: 'MessagingCtrl'
        });
    }])
    .controller('MessagingCtrl', function ($rootScope, $scope, $http, $filter, $mdDialog) {

        $scope.check = function(user){
            if(user._id===$rootScope.userdata._id){
                return true;
            }
            else{
                return false;
            }
        }

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
        $scope.finestraxat;
        $scope.destinatari;

        // Obtener todos los usuarios

        $http.get(API +'/users')
            .then(function(response) {
                $scope.users = response.data;
                if(userdata.conversations[0] !== undefined) {
                    console.log("Conversations not null");
                    $scope.finestraxat=true;
                    $scope.getMessages(userdata.conversations[0]);
                }
                else{
                    console.log("Conversations null");
                    $scope.finestraxat=false;
                }
            }, function (error){
                console.log('Error al obtener los usuarios: ' + error.data);
            });

        // Seleccionar conversa

        $scope.selectConversation = function (user) {
                $scope.selected = true;
                $scope.getMessages(user._id);
                console.log($scope.selected);
        };

        // Obtener todos los mensajes de un usuario determinado

        $scope.conversation = {};
        $scope.conversation2 = {};

        $scope.getMessages = function (user_id) {
            $http.get(API + '/msg/' + user_id)
                .then(function (response) {
                    $scope.conversation = response.data;
                    $scope.conversation2 = orderMessages($scope.conversation, user_id);
                }, function (error) {
                    console.log('Error al obtener los mensajes: ' + error.data);
                });

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