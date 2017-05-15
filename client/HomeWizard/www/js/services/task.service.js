(function() {

    angular
        .module('starter')
        .service('TaskService', service);

    function service($http, $q, $log, MemberService) {

        var vm = this;

        vm.getAvaiableTasks = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:3000/task/available'
            }).then(
                function(response) {
                    deferred.resolve(response.data.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        vm.getMyTasks = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'http://localhost:3000/task/my?assignedTo=' + MemberService.memberLoggedIn._id
            }).then(
                function(response) {
                    deferred.resolve(response.data.data);
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        vm.getTasks = function(filter) {

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
                url: 'http://localhost:3000/task' + query
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

        vm.new = function(task) {

            var deferred = $q.defer();

            if(!task.createdBy) {
                task.createdBy = MemberService.memberLoggedIn;
            }

            $http({
                method: 'POST',
                url: 'http://localhost:3000/task/new',
                data: task
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

        vm.delete = function(task) {

            var deferred = $q.defer();

            $http({
                method: 'DELETE',
                url: 'http://localhost:3000/task/delete',
                data: task
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

        vm.save = function(task) {

            var deferred = $q.defer();

            $http({
                method: 'PUT',
                url: 'http://localhost:3000/task/save',
                data: task
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

    }

})();