/**
 * Created by juan on 19/03/17.
 */

angular.module('myApp', ['ngRoute', 'myApp.login', 'myApp.sidenav', 'ngAnimate'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        if ((localStorage.getItem('fs_web_token')) && (JSON.parse(localStorage.getItem('fs_web_userdata')) !== 'null')
            && (JSON.parse(localStorage.getItem('fs_web_userdata')) !== null)) {
            if (window.location.hash === '#!/login') {
                window.location = '#!/portal';
            }
            $routeProvider.otherwise({redirectTo: '/portal'});
        }
        else {
            if ((window.location !== '#!/login') || (window.location !== '#!/signup')) {
                console.log('L\'usuari no ha iniciat sessió');

                localStorage.removeItem('fs_web_token');
                localStorage.removeItem('fs_web_userdata');
                window.location = '#!/login';
                $routeProvider.otherwise({redirectTo: '/login'});
            }
        }

    }]);

