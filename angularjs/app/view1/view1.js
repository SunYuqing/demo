'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  //声明路由字典
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'//设置整个模板页面所需的控制器
  });
}])

.controller('View1Ctrl', [function() {

}]);