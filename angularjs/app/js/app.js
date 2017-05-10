angular.module('myModule1',['ng','ngRoute','ngAnimate']).
controller('startCtrl',function($scope,$location){
    $scope.jump=function(routeUrl){
    $location.path(routeUrl);
    }
}).
    controller('mainCtrl',function($scope,$location){

}).
    controller('detailCtrl',function($scope,$location){

}).
config(function($routeProvider){
    $routeProvider.
    when('/start',{//start是可以随便写的
        templateUrl:'tpl/start.html',//start.html
        controller:'startCtrl',
        routeUrl:'/main'
    }).
    when("/main",{
        templateUrl:'tpl/main.html',
        controller:'mainCtrl'
    }).
    when('/detail',{
        templateUrl:'tpl/detail.html',
        controller:'detailCtrl'
    }).
    otherwise({
        //若URL中未提供路由地址或提供了不存在的路由地址
        redirectTo:'/start'
    })


})