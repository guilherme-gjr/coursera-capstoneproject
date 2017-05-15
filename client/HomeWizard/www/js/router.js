// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter')

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.room', {
                url: '/room/:roomID',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/room.html',
                        controller: 'RoomController',
                        controllerAs: 'ctrl'
                    }
                }
            })

            .state('app.room-list', {
                url: '/room-list',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/room-list.html',
                        controller: 'RoomListController',
                        controllerAs: 'ctrl'
                    }
                }
            })

            .state('app.family-member', {
                url: '/family-member/:memberID',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/family-member.html'
                    }
                }
            })

            .state('app.family-member-list', {
                url: '/family-member-list',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/family-member-list.html'
                    }
                }
            })

            .state('app.task-list', {
                url: '/task-list',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/task-list.html',
                        controller: 'TaskListController',
                        controllerAs: 'ctrl'
                    }
                }
            })

            .state('app.my-tasks', {
                url: '/my-tasks',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/task-list.html',
                        controller: 'TaskListController',
                        controllerAs: 'ctrl'
                    }
                }
            })

            .state('app.task', {
                url: '/task/:taskID',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/task.html',
                        controller: 'TaskController',
                        controllerAs: 'ctrl'
                    }
                }
            })

            .state('app.ranking', {
                url: '/ranking/:year/:month',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/ranking.html',
                        controller: 'PlaylistCtrl'
                    }
                }
            });
            
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/task-list');
    });
