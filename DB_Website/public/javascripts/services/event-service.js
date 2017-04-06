angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        var deferred = $q.defer();


        this.postEvent = function(thisEvent)
        {

            $http.post('http://localhost:3000/events', 
            {
                eventName: thisEvent.eventName,
                eventLocation: thisEvent.eventLocation,
                eventStartTime: thisEvent.eventStartTime,
                eventEndTime: thisEvent.eventEndTime,
                eventContactEmail: thisEvent.eventContactEmail,
                eventContactNumber: thisEvent.eventContactNumber,
                eventURL: thisEvent.eventURL
            }).then( function(data){
                deferred.resolve(data);
            })
            return deferred.promise;

        };

        this.makeComment = function(comment)
        {
            var url = 'http://localhost:3000/events';
            $http.post(url, {
                type: 'comment',
                eventName: "name",
                author: comment.author,
                comment: comment.comment
            }).then( function(data){
                deferred.resolve(data);
            })

            return deferred.promise;
        };

}]);