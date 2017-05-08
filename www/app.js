var API = "http://localhost:3001/api";

angular.module('myApp', ['ui.router', 'ngMap', 'myApp.starter', 'myApp.portal', 'myApp.book',
    'myApp.login', 'myApp.register', 'myApp.library', 'myApp.profile', 'myApp.sidenav',
    'myApp.map', 'myApp.book', 'myApp.review', 'myApp.messaging', 'myApp.settings', 'myApp.publicar',
    'myApp.bookFinder', 'myApp.bookFinder2', 'myApp.advSearch', 'myApp.results'])

.run(['$rootScope', '$state','$stateParams',
function($rootScope, $state, $stateParams){
    $rootScope.$state=$state;
    $rootScope.$stateParams= $stateParams;
    console.log('state', $state);
    if (localStorage.getItem('fs_web_token')) {
        console.log('L\'usuari ha iniciat sessió, redirigint al portal');
        $rootScope.logged = true;
        $rootScope.userdata = JSON.parse(localStorage.getItem("fs_web_userdata"));
        $state.go("portal")
    }
    else {
        console.log('L\'usuari no ha iniciat sessió');
        localStorage.removeItem('fs_web_userdata');
        $rootScope.logged = false;
        $state.go("starter")
        
    }
}])

.config(['$stateProvider', function($stateProvider){
    this.$get = ["$state", function($state){ //Inject $state here
   console.log('adios', $state)
    if (localStorage.getItem('fs_web_token')) {
        console.log('L\'usuari ha iniciat sessió, redirigint al portal')
        $state.go("portal")
    }
    else {
        console.log('L\'usuari no ha iniciat sessió');
        $state.go("starter")
    }
    }]
}]);