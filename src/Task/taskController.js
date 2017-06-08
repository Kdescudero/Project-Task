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