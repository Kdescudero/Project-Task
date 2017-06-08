(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/task', {
                controller: 'taskController',
                controllerAs: 'task',
                templateUrl: 'src/Task/task.html'
            })
    }

})();
