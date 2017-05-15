(function () {

    angular
        .module('starter')
        .controller('RoomController', roomController)
        .controller('RoomListController', roomListController);

    function roomController(RoomService, $ionicPopup, $log, $state, $stateParams) {
        var vm = this;

        vm.room = {};

        if($stateParams.roomID) {
            RoomService.getRooms({_id: $stateParams.roomID}).then(
                function(rooms) {
                    vm.room = rooms[0];
                },
                function(error) {
                    $log.error(error);
                }
            );
        }


        vm.save = function () {

            var promise = vm.room._id ? RoomService.save(vm.room) : RoomService.new(vm.room);
            var msg = vm.room._id ? "updated" : "created";
            
            promise.then(
                function () {
                    $ionicPopup.alert({
                        title: 'Information',
                        template: 'The room was ' + msg
                    }).then(function() {
                        $state.go('app.room-list', {
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

    function roomListController(RoomService, $log, $ionicPopup) {
        var vm = this;

        vm.rooms = [];

        vm.getRooms = function() {
            RoomService.getRooms().then(
                function(rooms) {
                    vm.rooms = rooms;
                },
                function(error) {
                    $log.error(error);
                }
            )
        }

        vm.delete = function(room, $event) {
            $event.stopImmediatePropagation(); 
            $event.preventDefault();

            RoomService.delete(room).then(
                function() {
                    vm.getRooms();
                    $ionicPopup.alert({
                        title: 'Information',
                        template: 'The room was removed'
                    });
                },
                function(error) {
                    $ionicPopup.alert({
                        title: 'Information',
                        template: error.message
                    });
                }
            )
        }

        vm.getRooms();

    }

})();