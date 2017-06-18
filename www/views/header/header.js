/**
 * Created by juan on 21/04/17.
 */

angular.module('myApp.header', ['ngMaterial', 'ngMessages'])
    .controller('HeaderCtrl', function DemoCtrl($mdDialog) {
    var originatorEv;

    this.openMenu = function($mdMenu, ev) {
        originatorEv = ev;
        $mdMenu.open(ev);
    };

    this.announceClick = function(index) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('You clicked!')
                .textContent('You clicked the menu item at index ' + index)
                .ok('Nice')
                .targetEvent(originatorEv)
        );
        originatorEv = null;
    };
});