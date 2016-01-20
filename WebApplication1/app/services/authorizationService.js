(function () {
    'use strict';

    var serviceId = 'authorizationService';
    angular.module('app').factory(serviceId, ['common', authorizationService]);

    function authorizationService(common) {
        var $q = common.$q;

        return {
        // We would cache the permission for the session,
        //to avoid roundtrip to server
        //for subsequent requests

        permissionCheck: function (roleCollection) {

            // we will return a promise .
            var deferred = $q.defer();

            //this is just to keep a pointer to parent scope from within promise scope.
            var parentPointer = this;

            //Checking if permission object(list of roles for logged in user) 
            //is already filled from service
            this.getPermission(usertypeId, roleCollection, deferred);

        //Method to check if the current user has required role to access the route
        //'permissionModel' has permission information obtained from server for current user
        //'roleCollection' is the list of roles which are authorized to access route
        //'deferred' is the object through which we shall resolve promise
        getPermission: function (usertypeId, roleCollection, deferred) {
            var ifPermissionPassed = false;

            if (!ifPermissionPassed) {
                //If user does not have required access, 
                //we will route the user to unauthorized access page
                $location.path(routeForUnauthorizedAccess);
                //As there could be some delay when location change event happens, 
                //we will keep a watch on $locationChangeSuccess event
                // and would resolve promise when this event occurs.
                $rootScope.$on('$locationChangeSuccess', function (next, current) {
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
        }
    };
       
    }
})();