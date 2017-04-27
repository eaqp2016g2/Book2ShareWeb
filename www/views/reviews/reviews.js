/**
 * Created by juan on 30/03/17.
 */

angular.module('myApp.review', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('reviews', {
            url: '/reviews',
            templateUrl: 'views/reviews/reviews.html',
            controller: 'ReviewsController'
        });
    }])
    .controller('ReviewsController', function ($scope, $http) {

    });