angular.module('appZ', ['userService','eventService','EventCtrl'])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });