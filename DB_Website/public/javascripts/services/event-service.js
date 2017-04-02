angular.module('eventService',[])
    .service('eventService', ['$http', '$q', '$window', function eventService($http, $q, $window){
        
        var deferred = $q.defer();



        this.postEvent = function(thisEvent){

            $http.post('http://localhost:3000/events', {
                eventName: thisEvent.title,
                eventLocation: thisEvent.location,
                eventStartTime: thisEvent.sTime,
                eventEndTime: thisEvent.eTime,
                eventContactEmail: thisEvent.contactEmail,
                eventContactNumber: thisEvent.contactNumber,
                eventURL: thisEvent.url
            }).then( function(data){
                deferred.resolve(data);
            });
            return deferred.promise;

        };

    }]);