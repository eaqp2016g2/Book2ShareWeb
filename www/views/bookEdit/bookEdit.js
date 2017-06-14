angular.module('myApp.publicar', ['ngMaterial', 'ui.router'])
.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('publicar', {
            url: '/books/publicar',
            templateUrl: 'views/bookEdit/bookEdit.html',
            controller: 'publicarCtrl'
        });
    }])
.controller('publicarCtrl', function ($scope, $http, $state, $rootScope, $element) {

        $scope.book = {};
        $scope.book.propietary=$rootScope.userdata.name
        console.log('book', $scope.book)
        $scope.genres = ["Fantasia", "Terror", "Juvenil", "Romantico", "Otros"];
        $scope.languages = ["Catala", "Castella", "Anglès"];
         $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $element.find('input').on('keydown', function(ev) {
          ev.stopPropagation();
      });
      $scope.selectedItem;
      $scope.getSelectedText = function() {
        if ($scope.selectedItem !== undefined) {
          return "Idioma del llibre: " + $scope.selectedItem;
        } else {
          return "Selecciona un idioma";
        }
      };

        $scope.publicar = function ($state) {
            console.log("genre: "+ $scope.book.genre);
            $scope.book.language=$scope.selectedItem;
            $http({
                url: API + '/book',
                method: "POST",
                data: $scope.book
            })
                .then(function (response) {
                        if (response.data.success === true) {
                            $scope.book={};
                            //$state.go("library")
                        } else {
                            console.log("Ha fallat la publicació del llibre");
                            console.log(response);
                        }
                    });
        };
    });