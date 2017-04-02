angular.module('EventCtrl', ['userService', 'eventService'])
    .config(function($locationProvider)
        {
                $locationProvider.html5Mode
                ({
                    enabled: true,
                    requireBase: false
                });
        })
    .controller('EventCtrl', ['$scope', '$window', '$location', 'userService','eventService', 
        function EventCtrl($scope, $window, $location, userService, eventService) {
        
        $scope.postEvent = function(thisEvent){

            console.log("postEvent()");
            eventService.postEvent(thisEvent);    
            //console.log(thisEvent);
        };

        
        
    }]);
