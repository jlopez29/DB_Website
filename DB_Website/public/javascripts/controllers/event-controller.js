angular.module('appZ', ['userService', 'eventService'])
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
        $scope.events = [];


        $scope.postEvent = function(thisEvent){
            console.log("postEvent()");
            
            //updateView(thisEvent);    
            //console.log(thisEvent);

            var promise = eventService.postEvent(thisEvent);
            promise.then(function (data){

                 $scope.events.push(

                    {
                        eventName: data.data.eventName,
                        eventLocation: data.data.eventLocation,
                        eventStartTime: data.data.eventStartTime,
                        eventEndTime: data.data.eventEndTime,
                        eventContactEmail: data.data.eventContactEmail,
                        eventContactNumber: data.data.eventContactNumber,
                        eventURL: data.data.eventURL
                    }


                 );

                 console.log(data.data.event);
                 //$window.location.reload();
             });
        };

        $scope.makeComment = function(comment){

            console.log("comment");

            comment.author = "author";
            var promise = eventService.makeComment(comment);
            promise.then(function (data){
                 console.log("***comments***" + data.data.comments);

                 $scope.comments = data.data.comments;
                 $window.location.reload();
             });
        };    
        
        
}]);