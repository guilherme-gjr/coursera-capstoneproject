(function() {

    angular
        .module('starter')
        .service('MemberService', MemberService);

    function MemberService($http, $q) {
        var vm = this;

        vm.memberLoggedIn = { 
            _id: "5917a5e8c2f40c0cebf62737"
        };

        vm.getMembers = function(filter) {

            var deferred = $q.defer();

            var query = "", separador = "?";
            for (var property in filter) {
                if (filter.hasOwnProperty(property)) {
                    query += separador + property + "=" + filter[property];
                    separador = "&";
                }
            }

            $http({
                method: 'GET',
                url: 'http://localhost:3000/family/member' + query
            }).then(
                function(response) {
                    deferred.resolve(response.data.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };
    }

})();