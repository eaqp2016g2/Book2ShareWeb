/**
 * Created by juan on 19/03/17.
 */

angular.module('myApp', ['ngRoute', 'myApp.login']).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    console.log('app, user no logged');
    localStorage.removeItem('fs_web_token');
    localStorage.removeItem('fs_web_userdata');
    window.location = '#!/login';
    $routeProvider.otherwise({redirectTo: '/login'});
}]);

