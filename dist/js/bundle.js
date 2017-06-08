angular.module('app', [
  "ngRoute",
  "ngResource",
  "ngAnimate",
  "ngSanitize",
  "ngMessages",
  "ngMaterial",
  "md.data.table",
  "LocalStorageModule",
  "ngjsColorPicker"
]);
(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();

(function() {
  'use strict';
  angular
    .module('app')
    .constant('version', '1.0')
})();
(function() {
  'use strict';

  angular
    .module('app')
    .run(run);

  /** @ngInject */
  function run($log) {
    //$log.debug('runBlock end');
  }

})();

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

(function () {
  'use strict';

  angular
    .module('app')
    .constant('DataTask', {
      taskData: 'taskData'
    })
})();

(function () {
    'use strict';
    
/** @ruta de la directivas (./src/directives/XXXXX) */   

    angular
        .module('app')
        .controller('taskController', taskController)

        .directive('messagExit', function(){
          return{template: `<div class="alertExit md-whiteframe-5dp" ng-if="messagExit"><strong class="title-alert">{{messagExit}}</strong></div>`}})

        .directive('messagEdit', function(){
          return{template: `<div class="alertExit md-whiteframe-5dp" ng-if="messagEdit"><strong class="title-alert-Edit">{{messagEdit}}</strong></div>`}})

        .directive('messagDelete', function(){
          return{template: `<div class="alertDelete md-whiteframe-5dp" ng-if="messageDelete"><strong class="title-alert-delete">{{messageDelete}}</strong></div>`}})

        .directive('modalAdd', function(){
          return{
            restrict: 'M',
            replace: true,
            templateUrl: './src/directives/ModalAdd.html'
          }
        })   

        .directive('modalEdit', function(){
          return{
            restrict: 'M',
            replace: true,
            templateUrl: './src/directives/ModalEdit.html'
          }
        })

        .directive('selectColor', function(){
          return{
            template: `<input type="text" class="inputColor" id="checkColor" ng-model="Colorcontainer">
                        <label for="checkColor" ng-click="divPike=!divPike" style="color:{{Colorcontainer}}" class="selecColor">Identify your task with a color 
                          <i class="material-icons icon-selectColor">color_lens</i>
                        </label>

                        <div class="divPiker md-whiteframe-2dp" ng-class="{divPike:divPike}">
                          <samp class="triangulo"></samp>
                          <ngjs-color-picker class="colorPiker" selected-color="Colorcontainer" options="optionsColumn"></ngjs-color-picker>
                        </div>`
              }
          })

        .directive('selectEditColor', function(){
          return{
            template: `<input type="text" class="inputColor" id="checkColor" ng-model="seleTask.Colorcontainer">
                        <label for="checkColor" ng-click="divPike=!divPike" style="color:{{seleTask.Colorcontainer}}" class="selecColor">Identify your task with a color 
                          <i class="material-icons icon-selectColor">color_lens</i>
                        </label>

                      <div class="divPiker md-whiteframe-2dp" ng-class="{divPike:divPike}">
                        <samp class="triangulo"></samp>
                        <ngjs-color-picker class="colorPiker" selected-color="seleTask.Colorcontainer" options="optionsColumn"></ngjs-color-picker>
                      </div>`
             }
        })

        .directive('svgCircle', function(){
          return{
            template: ` <div class="divSvg fact-{{task.fact}}"><svg><circle style="fill:{{task.Colorcontainer}}"></circle></svg></div>`
            }
          })


    /** @ngInject */
    taskController.$inject = ['$scope', '$http', 'localStorageService','$location', '$timeout'];
    function taskController($scope, $http, localStorageService, $location,  $timeout) {

      $scope.tasks = [];
      $scope.seleTask = {};
      var date = new Date();
      var months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      $scope.monDate = months[date.getMonth()-1] + ' ' + date.getDate();

      $scope.optionsColumn = {
        columns: 4,
        roundCorners: true
      };

      (function randomMessage(){
        $timeout(randomMessage, 6000);
         $scope.messagExit = "";
         $scope.messageDelete = "";
         $scope.messagEdit = "";
      }());

      (function randomImg(){
        $timeout(randomImg, 800);
        $scope.img = "img-" +(Math.floor(Math.random() * 7));
      }());

      $scope.restFields = function(){
        $scope.Taskname = null;
        $scope.chargeOfTask = null;
        $scope.Colorcontainer = null;
        $scope.formAddTasks.$setUntouched();
        $scope.formAddTasks.$setPristine();
      }

      $scope.checkFact = function(index){
        var factEdit = localStorageService.get('Task');
        factEdit[index].fact=!factEdit[index].fact;
        localStorageService.set('Task', factEdit)
      }

			$scope.agregar = function(){
				$scope.newTask = {
                            Taskname: $scope.Taskname, 
                            chargeOfTask: $scope.chargeOfTask, 
                            fact: false, 
                            monDate: $scope.monDate,
                            img: $scope.img, 
                            Colorcontainer: $scope.Colorcontainer
                        };
				$scope.tasks.push($scope.newTask);
        $scope.restFields();
        $scope.messagExit = "Success when saving the task";
        document.querySelector("#myModal .close").click();
				localStorageService.set('Task', $scope.tasks);
			}

      $scope.delete = function(index){
        $scope.tasks.splice(index, 1);
        $scope.messageDelete = "The task has been deleted";
        localStorageService.set('Task', $scope.tasks);
      }

      $scope.deleAllCheck = function(index){
        var taskOld = $scope.tasks;
        $scope.tasks = [];
          angular.forEach(taskOld, function(task){
            if(!task.fact){
              $scope.tasks.push(task);
            }
        });
        localStorageService.set('Task', $scope.tasks);
      }

      $scope.selecTask = function(task, index){
        $scope.indTask = index;
        $scope.seleTask = angular.copy(task); 
      }

      $scope.updaTask = function(){
        $scope.tasks[$scope.indTask].Taskname = $scope.seleTask.Taskname;
        $scope.tasks[$scope.indTask].chargeOfTask = $scope.seleTask.chargeOfTask;
        $scope.tasks[$scope.indTask].Colorcontainer = $scope.seleTask.Colorcontainer;
        $scope.messagEdit = "Success when edit the task";
        localStorageService.set('Task', $scope.tasks);
      }
      
    if(localStorageService.get('Task')){
        $scope.tasks = localStorageService.get('Task');
      }

	}
})();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsImNvbnN0YW50cy5qcyIsInJ1bi5qcyIsInByZWxvYWRlci9sb2FkZXJDb250cm9sbGVyLmpzIiwicHJlbG9hZGVyL2xvYWRlclJvdXRlLmpzIiwiVGFzay90YXNrQ29uc3RhbnRzLmpzIiwiVGFzay90YXNrQ29udHJvbGxlci5qcyIsIlRhc2svdGFza1JvdXRlLmpzIiwiVGFzay90YXNrU2VydmljZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgXCJuZ1JvdXRlXCIsXG4gIFwibmdSZXNvdXJjZVwiLFxuICBcIm5nQW5pbWF0ZVwiLFxuICBcIm5nU2FuaXRpemVcIixcbiAgXCJuZ01lc3NhZ2VzXCIsXG4gIFwibmdNYXRlcmlhbFwiLFxuICBcIm1kLmRhdGEudGFibGVcIixcbiAgXCJMb2NhbFN0b3JhZ2VNb2R1bGVcIixcbiAgXCJuZ2pzQ29sb3JQaWNrZXJcIlxuXSk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhjb25maWcpO1xuXG4gIC8qKiBAbmdJbmplY3QgKi9cbiAgZnVuY3Rpb24gY29uZmlnKCRsb2dQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xuICAgIC8vIEVuYWJsZSBsb2dcbiAgICAkbG9nUHJvdmlkZXIuZGVidWdFbmFibGVkKHRydWUpO1xuICB9XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnN0YW50KCd2ZXJzaW9uJywgJzEuMCcpXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5ydW4ocnVuKTtcblxuICAvKiogQG5nSW5qZWN0ICovXG4gIGZ1bmN0aW9uIHJ1bigkbG9nKSB7XG4gICAgLy8kbG9nLmRlYnVnKCdydW5CbG9jayBlbmQnKTtcbiAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgXG4vKiogQHJ1dGEgZGUgbGEgZGlyZWN0aXZhcyAoLi9zcmMvZGlyZWN0aXZlcy9YWFhYWCkgKi8gICBcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2xvYWRlckNvbnRyb2xsZXInLCBsb2FkZXJDb250cm9sbGVyKVxuXG4gICAgLyoqIEBuZ0luamVjdCAqL1xuICAgIGxvYWRlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRodHRwJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCckbG9jYXRpb24nLCAnJHRpbWVvdXQnLCAnJHdpbmRvdyddO1xuICAgIGZ1bmN0aW9uIGxvYWRlckNvbnRyb2xsZXIoJHNjb3BlLCAkaHR0cCwgbG9jYWxTdG9yYWdlU2VydmljZSwgJGxvY2F0aW9uLCAgJHRpbWVvdXQsICR3aW5kb3cpIHtcblxuICAgICAgICB2YXIgcHJlbG9hZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlbG9hZFwiKTtcbiAgICAgICAgdmFyIGxvYWRpbmcgPSAwO1xuICAgICAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChmcmFtZSwgODIpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZyYW1lKCl7XG4gICAgICAgICAgICBpZihsb2FkaW5nID09IDc5KXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICAgICAgICAgICAgICAkd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiMvdGFza1wiO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbG9hZGluZyA9IGxvYWRpbmcgKyAxO1xuICAgICAgICAgICAgICAgIGlmKGxvYWRpbmcgPT0gNzApe1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkLnN0eWxlLmFuaW1hdGlvbiA9IFwiZmFkZW91dCAxcyBlYXNlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBjb25maWcuJGluamVjdCA9IFsnJHJvdXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInXTtcbiAgICBmdW5jdGlvbiBjb25maWcoJHJvdXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAud2hlbignLycsIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9hZGVyQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnbG9hZGVyJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NyYy9wcmVsb2FkZXIvbG9hZGVyLmh0bWwnXG4gICAgICAgICAgICB9KVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwJylcbiAgICAuY29uc3RhbnQoJ0RhdGFUYXNrJywge1xuICAgICAgdGFza0RhdGE6ICd0YXNrRGF0YSdcbiAgICB9KVxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIFxuLyoqIEBydXRhIGRlIGxhIGRpcmVjdGl2YXMgKC4vc3JjL2RpcmVjdGl2ZXMvWFhYWFgpICovICAgXG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCd0YXNrQ29udHJvbGxlcicsIHRhc2tDb250cm9sbGVyKVxuXG4gICAgICAgIC5kaXJlY3RpdmUoJ21lc3NhZ0V4aXQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybnt0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJhbGVydEV4aXQgbWQtd2hpdGVmcmFtZS01ZHBcIiBuZy1pZj1cIm1lc3NhZ0V4aXRcIj48c3Ryb25nIGNsYXNzPVwidGl0bGUtYWxlcnRcIj57e21lc3NhZ0V4aXR9fTwvc3Ryb25nPjwvZGl2PmB9fSlcblxuICAgICAgICAuZGlyZWN0aXZlKCdtZXNzYWdFZGl0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZXR1cm57dGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiYWxlcnRFeGl0IG1kLXdoaXRlZnJhbWUtNWRwXCIgbmctaWY9XCJtZXNzYWdFZGl0XCI+PHN0cm9uZyBjbGFzcz1cInRpdGxlLWFsZXJ0LUVkaXRcIj57e21lc3NhZ0VkaXR9fTwvc3Ryb25nPjwvZGl2PmB9fSlcblxuICAgICAgICAuZGlyZWN0aXZlKCdtZXNzYWdEZWxldGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybnt0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJhbGVydERlbGV0ZSBtZC13aGl0ZWZyYW1lLTVkcFwiIG5nLWlmPVwibWVzc2FnZURlbGV0ZVwiPjxzdHJvbmcgY2xhc3M9XCJ0aXRsZS1hbGVydC1kZWxldGVcIj57e21lc3NhZ2VEZWxldGV9fTwvc3Ryb25nPjwvZGl2PmB9fSlcblxuICAgICAgICAuZGlyZWN0aXZlKCdtb2RhbEFkZCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgcmV0dXJue1xuICAgICAgICAgICAgcmVzdHJpY3Q6ICdNJyxcbiAgICAgICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vc3JjL2RpcmVjdGl2ZXMvTW9kYWxBZGQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pICAgXG5cbiAgICAgICAgLmRpcmVjdGl2ZSgnbW9kYWxFZGl0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICByZXN0cmljdDogJ00nLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9zcmMvZGlyZWN0aXZlcy9Nb2RhbEVkaXQuaHRtbCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLmRpcmVjdGl2ZSgnc2VsZWN0Q29sb3InLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJpbnB1dENvbG9yXCIgaWQ9XCJjaGVja0NvbG9yXCIgbmctbW9kZWw9XCJDb2xvcmNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrQ29sb3JcIiBuZy1jbGljaz1cImRpdlBpa2U9IWRpdlBpa2VcIiBzdHlsZT1cImNvbG9yOnt7Q29sb3Jjb250YWluZXJ9fVwiIGNsYXNzPVwic2VsZWNDb2xvclwiPklkZW50aWZ5IHlvdXIgdGFzayB3aXRoIGEgY29sb3IgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgaWNvbi1zZWxlY3RDb2xvclwiPmNvbG9yX2xlbnM8L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGl2UGlrZXIgbWQtd2hpdGVmcmFtZS0yZHBcIiBuZy1jbGFzcz1cIntkaXZQaWtlOmRpdlBpa2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzYW1wIGNsYXNzPVwidHJpYW5ndWxvXCI+PC9zYW1wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bmdqcy1jb2xvci1waWNrZXIgY2xhc3M9XCJjb2xvclBpa2VyXCIgc2VsZWN0ZWQtY29sb3I9XCJDb2xvcmNvbnRhaW5lclwiIG9wdGlvbnM9XCJvcHRpb25zQ29sdW1uXCI+PC9uZ2pzLWNvbG9yLXBpY2tlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG5cbiAgICAgICAgLmRpcmVjdGl2ZSgnc2VsZWN0RWRpdENvbG9yJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICByZXR1cm57XG4gICAgICAgICAgICB0ZW1wbGF0ZTogYDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiaW5wdXRDb2xvclwiIGlkPVwiY2hlY2tDb2xvclwiIG5nLW1vZGVsPVwic2VsZVRhc2suQ29sb3Jjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVja0NvbG9yXCIgbmctY2xpY2s9XCJkaXZQaWtlPSFkaXZQaWtlXCIgc3R5bGU9XCJjb2xvcjp7e3NlbGVUYXNrLkNvbG9yY29udGFpbmVyfX1cIiBjbGFzcz1cInNlbGVjQ29sb3JcIj5JZGVudGlmeSB5b3VyIHRhc2sgd2l0aCBhIGNvbG9yIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGljb24tc2VsZWN0Q29sb3JcIj5jb2xvcl9sZW5zPC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXZQaWtlciBtZC13aGl0ZWZyYW1lLTJkcFwiIG5nLWNsYXNzPVwie2RpdlBpa2U6ZGl2UGlrZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzYW1wIGNsYXNzPVwidHJpYW5ndWxvXCI+PC9zYW1wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nanMtY29sb3ItcGlja2VyIGNsYXNzPVwiY29sb3JQaWtlclwiIHNlbGVjdGVkLWNvbG9yPVwic2VsZVRhc2suQ29sb3Jjb250YWluZXJcIiBvcHRpb25zPVwib3B0aW9uc0NvbHVtblwiPjwvbmdqcy1jb2xvci1waWNrZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuZGlyZWN0aXZlKCdzdmdDaXJjbGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybntcbiAgICAgICAgICAgIHRlbXBsYXRlOiBgIDxkaXYgY2xhc3M9XCJkaXZTdmcgZmFjdC17e3Rhc2suZmFjdH19XCI+PHN2Zz48Y2lyY2xlIHN0eWxlPVwiZmlsbDp7e3Rhc2suQ29sb3Jjb250YWluZXJ9fVwiPjwvY2lyY2xlPjwvc3ZnPjwvZGl2PmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuXG5cbiAgICAvKiogQG5nSW5qZWN0ICovXG4gICAgdGFza0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRodHRwJywgJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCckbG9jYXRpb24nLCAnJHRpbWVvdXQnXTtcbiAgICBmdW5jdGlvbiB0YXNrQ29udHJvbGxlcigkc2NvcGUsICRodHRwLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkbG9jYXRpb24sICAkdGltZW91dCkge1xuXG4gICAgICAkc2NvcGUudGFza3MgPSBbXTtcbiAgICAgICRzY29wZS5zZWxlVGFzayA9IHt9O1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgdmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuICAgICAgJHNjb3BlLm1vbkRhdGUgPSBtb250aHNbZGF0ZS5nZXRNb250aCgpLTFdICsgJyAnICsgZGF0ZS5nZXREYXRlKCk7XG5cbiAgICAgICRzY29wZS5vcHRpb25zQ29sdW1uID0ge1xuICAgICAgICBjb2x1bW5zOiA0LFxuICAgICAgICByb3VuZENvcm5lcnM6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIChmdW5jdGlvbiByYW5kb21NZXNzYWdlKCl7XG4gICAgICAgICR0aW1lb3V0KHJhbmRvbU1lc3NhZ2UsIDYwMDApO1xuICAgICAgICAgJHNjb3BlLm1lc3NhZ0V4aXQgPSBcIlwiO1xuICAgICAgICAgJHNjb3BlLm1lc3NhZ2VEZWxldGUgPSBcIlwiO1xuICAgICAgICAgJHNjb3BlLm1lc3NhZ0VkaXQgPSBcIlwiO1xuICAgICAgfSgpKTtcblxuICAgICAgKGZ1bmN0aW9uIHJhbmRvbUltZygpe1xuICAgICAgICAkdGltZW91dChyYW5kb21JbWcsIDgwMCk7XG4gICAgICAgICRzY29wZS5pbWcgPSBcImltZy1cIiArKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpKTtcbiAgICAgIH0oKSk7XG5cbiAgICAgICRzY29wZS5yZXN0RmllbGRzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHNjb3BlLlRhc2tuYW1lID0gbnVsbDtcbiAgICAgICAgJHNjb3BlLmNoYXJnZU9mVGFzayA9IG51bGw7XG4gICAgICAgICRzY29wZS5Db2xvcmNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgICRzY29wZS5mb3JtQWRkVGFza3MuJHNldFVudG91Y2hlZCgpO1xuICAgICAgICAkc2NvcGUuZm9ybUFkZFRhc2tzLiRzZXRQcmlzdGluZSgpO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuY2hlY2tGYWN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICB2YXIgZmFjdEVkaXQgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnVGFzaycpO1xuICAgICAgICBmYWN0RWRpdFtpbmRleF0uZmFjdD0hZmFjdEVkaXRbaW5kZXhdLmZhY3Q7XG4gICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdUYXNrJywgZmFjdEVkaXQpXG4gICAgICB9XG5cblx0XHRcdCRzY29wZS5hZ3JlZ2FyID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0JHNjb3BlLm5ld1Rhc2sgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGFza25hbWU6ICRzY29wZS5UYXNrbmFtZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhcmdlT2ZUYXNrOiAkc2NvcGUuY2hhcmdlT2ZUYXNrLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWN0OiBmYWxzZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9uRGF0ZTogJHNjb3BlLm1vbkRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nOiAkc2NvcGUuaW1nLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb2xvcmNvbnRhaW5lcjogJHNjb3BlLkNvbG9yY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHRcdFx0XHQkc2NvcGUudGFza3MucHVzaCgkc2NvcGUubmV3VGFzayk7XG4gICAgICAgICRzY29wZS5yZXN0RmllbGRzKCk7XG4gICAgICAgICRzY29wZS5tZXNzYWdFeGl0ID0gXCJTdWNjZXNzIHdoZW4gc2F2aW5nIHRoZSB0YXNrXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbXlNb2RhbCAuY2xvc2VcIikuY2xpY2soKTtcblx0XHRcdFx0bG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ1Rhc2snLCAkc2NvcGUudGFza3MpO1xuXHRcdFx0fVxuXG4gICAgICAkc2NvcGUuZGVsZXRlID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICAkc2NvcGUudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VEZWxldGUgPSBcIlRoZSB0YXNrIGhhcyBiZWVuIGRlbGV0ZWRcIjtcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ1Rhc2snLCAkc2NvcGUudGFza3MpO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuZGVsZUFsbENoZWNrID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICB2YXIgdGFza09sZCA9ICRzY29wZS50YXNrcztcbiAgICAgICAgJHNjb3BlLnRhc2tzID0gW107XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRhc2tPbGQsIGZ1bmN0aW9uKHRhc2spe1xuICAgICAgICAgICAgaWYoIXRhc2suZmFjdCl7XG4gICAgICAgICAgICAgICRzY29wZS50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ1Rhc2snLCAkc2NvcGUudGFza3MpO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUuc2VsZWNUYXNrID0gZnVuY3Rpb24odGFzaywgaW5kZXgpe1xuICAgICAgICAkc2NvcGUuaW5kVGFzayA9IGluZGV4O1xuICAgICAgICAkc2NvcGUuc2VsZVRhc2sgPSBhbmd1bGFyLmNvcHkodGFzayk7IFxuICAgICAgfVxuXG4gICAgICAkc2NvcGUudXBkYVRhc2sgPSBmdW5jdGlvbigpe1xuICAgICAgICAkc2NvcGUudGFza3NbJHNjb3BlLmluZFRhc2tdLlRhc2tuYW1lID0gJHNjb3BlLnNlbGVUYXNrLlRhc2tuYW1lO1xuICAgICAgICAkc2NvcGUudGFza3NbJHNjb3BlLmluZFRhc2tdLmNoYXJnZU9mVGFzayA9ICRzY29wZS5zZWxlVGFzay5jaGFyZ2VPZlRhc2s7XG4gICAgICAgICRzY29wZS50YXNrc1skc2NvcGUuaW5kVGFza10uQ29sb3Jjb250YWluZXIgPSAkc2NvcGUuc2VsZVRhc2suQ29sb3Jjb250YWluZXI7XG4gICAgICAgICRzY29wZS5tZXNzYWdFZGl0ID0gXCJTdWNjZXNzIHdoZW4gZWRpdCB0aGUgdGFza1wiO1xuICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnVGFzaycsICRzY29wZS50YXNrcyk7XG4gICAgICB9XG4gICAgICBcbiAgICBpZihsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnVGFzaycpKXtcbiAgICAgICAgJHNjb3BlLnRhc2tzID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ1Rhc2snKTtcbiAgICAgIH1cblxuXHR9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XG5cbiAgICAvKiogQG5nSW5qZWN0ICovXG4gICAgY29uZmlnLiRpbmplY3QgPSBbJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJ107XG4gICAgZnVuY3Rpb24gY29uZmlnKCRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgLndoZW4oJy90YXNrJywge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd0YXNrQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndGFzaycsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzcmMvVGFzay90YXNrLmh0bWwnXG4gICAgICAgICAgICB9KVxuICAgIH1cblxufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxuICAgICAgICAuZmFjdG9yeSgndGFza1NlcnZpY2VzJywgdGFza1NlcnZpY2VzKTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICB0YXNrU2VydmljZXMuJGluamVjdCA9IFsnJGh0dHAnLCAnJHEnXTtcbiAgICBmdW5jdGlvbiB0YXNrU2VydmljZXMoJGh0dHAsICRxLCBEYXRhdGFzaykge1xuICAgICAgICB2YXIgdGFza1NlcnZpY2UgPSB7fTtcbiAgICAgICAgcmV0dXJuIHRhc2tTZXJ2aWNlO1xuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
