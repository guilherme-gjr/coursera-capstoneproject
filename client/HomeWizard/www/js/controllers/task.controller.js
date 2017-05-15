(function(){

    angular
        .module('starter')
        .controller('TaskListController', TaskListController)
        .controller('TaskController', TaskController);

    function TaskListController(TaskService, $state, $log, $ionicPopup) {
        var vm = this;

        vm.tasks = [];
        vm.activeTab = 0;

        vm.showAvaiable = function() {
            vm.activeTab = 0;

            TaskService.getAvaiableTasks().then(
                function(tasks) { 
                    vm.tasks = tasks;
                },
                function(error) { console.log(error); }
            );
        };

        vm.showMy = function() {
            vm.activeTab = 1;

            TaskService.getMyTasks().then(
                function(tasks) { 
                    vm.tasks = tasks;
                },
                function(error) { console.log(error); }
            );
        }

        vm.delete = function(task, $event) {
            $event.stopImmediatePropagation(); 
            $event.preventDefault();
            TaskService.delete(task).then(
                function() {
                    $ionicPopup.alert({
                        title: 'Information',
                        template: 'The task was removed'
                    });
                    if(vm.activeTab == 0) {
                        vm.showAvaiable();
                    } else {
                        vm.showMy();
                    }
                },
                function(error) {
                    $ionicPopup.alert({
                        title: 'Information',
                        template: error.message
                    });
                }
            )
        }

        vm.showAvaiable();
    }


    function TaskController(TaskService, MemberService, RoomService, $log, $state, $stateParams, $ionicPopup) {
        var vm = this;

        vm.task = {};
        vm.rooms = [];
        vm.members = [];

        RoomService.getRooms().then(
            function(rooms) { vm.rooms = rooms; },
            function(error) { $log.error(error); }
        );

        MemberService.getMembers().then(
            function(members) { vm.members = members; },
            function(error) { $log.error(error); }
        )



        if($stateParams.taskID) {
            TaskService.getTasks({_id: $stateParams.taskID}).then(
                function(rooms) {
                    var tempTask = rooms[0];
                    tempTask.dueDate = new Date(tempTask.dueDate);
                    vm.task = tempTask;
                },
                function(error) {
                    $log.error(error);
                }
            );
        }


        vm.save = function () {

            var promise = vm.task._id ? TaskService.save(vm.task) : TaskService.new(vm.task);
            var msg = vm.task._id ? "updated" : "created";
            
            promise.then(
                function () {
                    $ionicPopup.alert({
                        title: 'Information',
                        template: 'The task was ' + msg
                    }).then(function() {
                        $state.go('app.task-list', {
                            cache: false
                        });
                    });
                },
                function(error) {
                    $ionicPopup.alert({
                        title: 'Oops',
                        template: error.message
                    });
                }
            );

        };

    }

})();