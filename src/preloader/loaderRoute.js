(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'loaderController',
                controllerAs: 'loader',
                templateUrl: 'src/preloader/loader.html'
            })
    }

})();
