/**
 * Created by juan on 19/03/17.
 */

angular.module( 'myApp', ['ngRoute', 'myApp.login', 'myApp.sidenav', 'myApp.starter',
                'myApp.register', 'myApp.portal', 'myApp.library', 'myApp.profile',
                'ngAnimate'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider, $scope) {
        //if ((localStorage.getItem('fs_web_token')) && (JSON.parse(localStorage.getItem('fs_web_userdata')) !== 'null')
        //     && (JSON.parse(localStorage.getItem('fs_web_userdata')) !== null)) {
        if (localStorage.getItem('fs_web_token')) {
            console.log('L\'usuari ha iniciat sessió, redirigint al portal');                      
            if ((window.location.hash === '#!/register') || (window.location === '#!/starter')) {
                window.location = '#!/portal';
            }
            $routeProvider.otherwise({redirectTo: '/portal'});
        }
        else {
            if ((window.location !== '#!/register') || (window.location !== '#!/starter')) {
                console.log('L\'usuari no ha iniciat sessió');

                localStorage.removeItem('fs_web_token');
                localStorage.removeItem('fs_web_userdata');
                window.location = '#!/starter';
                $routeProvider.otherwise({redirectTo: '/starter'});
            }
        }

    }]);

