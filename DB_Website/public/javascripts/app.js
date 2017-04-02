angular.module('app', ['userService','eventService','EventCtrl'])
    .config(function($locationProvider){
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })