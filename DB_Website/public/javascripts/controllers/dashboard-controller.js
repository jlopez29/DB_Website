angular.module('DashCtrl', ['userService', 'orgService', 'eventService'])
    .controller('DashCtrl', ['$scope', '$window', 'userService', 'orgService', 'eventService', 
        function DashCtrl($scope, $window, userService, orgService, eventService) {
        
        $scope.init = function(){
            var user = userService.getUserData();
            console.log(user);
            $scope.name = user.username;
            var promise = orgService.getJoinedOrgs();
            promise.then(function (data){
                console.log(data.data);
                $scope.orgs = data.data;
            });
        };
        
        $scope.selectOrg = function(org){
            var url = '../organization/' + org.name.toString();
            $window.location.href = url;
        };
    }]);
