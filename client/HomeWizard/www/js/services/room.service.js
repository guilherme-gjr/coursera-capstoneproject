(function() {

    angular
        .module('starter')
        .service('RoomService', service);

    function service($http, $q, $log) {

        var vm = this;


        vm.getRooms = function(filter) {

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
                url: 'http://localhost:3000/house/room' + query
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

        vm.new = function(room) {

            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: 'http://localhost:3000/house/room/new',
                data: room
            }).then(
                function(response) {
                    if(response.data.success) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        vm.save = function(room) {

            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: 'http://localhost:3000/house/room/save',
                data: room
            }).then(
                function(response) {
                    if(response.data.success) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        vm.delete = function(room, $event) {
            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/house/room/delete',
                data: room
            }).then(
                function(response) {
                    if(response.data.success) {
                        deferred.resolve(response.data);
                    } else {
                        deferred.reject(response.data);
                    }
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

    }

})();