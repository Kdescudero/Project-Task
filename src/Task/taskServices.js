(function () {
    'use strict';

    angular
        .module('app')
        .factory('taskServices', taskServices);

    /** @ngInject */
    taskServices.$inject = ['$http', '$q'];
    function taskServices($http, $q, Datatask) {
        var taskService = {};
        return taskService;
    }
})();