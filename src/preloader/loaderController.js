(function () {
    'use strict';
    
/** @ruta de la directivas (./src/directives/XXXXX) */   

    angular
        .module('app')
        .controller('loaderController', loaderController)

    /** @ngInject */
    loaderController.$inject = ['$scope', '$http', 'localStorageService','$location', '$timeout', '$window'];
    function loaderController($scope, $http, localStorageService, $location,  $timeout, $window) {

        var preload = document.querySelector(".preload");
        var loading = 0;
        var id = setInterval(frame, 82);

        function frame(){
            if(loading == 79){
                clearInterval(id);
                $window.location.href = "#/task";
            }else{
                loading = loading + 1;
                if(loading == 70){
                    preload.style.animation = "fadeout 1s ease";
                }
            }
        }
	}
})();