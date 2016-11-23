(function(angular) {
  'use strict';

  // 定义一个模块
 angular.module('myApp.movie_detail',[]).config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/detail/:id',{
    templateUrl:'movie_detail/view.html',
    controller:'movie_detail_Ctrl'
  })
}]).controller('movie_detail_Ctrl',['$scope','$routeParams','zwServers',function($scope,$routeParams,zwServers){
  var id=$routeParams.id;
  $scope.loading=true;
  $scope.subjects={
    title:'loading...',
    summary:'loading...'
  }
  zwServers.zwJsonp('https://api.douban.com/v2/movie/subject/'+id,{},function(data){
    // console.log(data);
    $scope.subjects=data;
    $scope.loading=false;
    $scope.$apply();
  })
}])
})(angular);
