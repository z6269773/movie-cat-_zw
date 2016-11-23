(function(angular){
	'use strict';

	angular.module('moviecatAPP.movies', ['ngRoute','moviecatAPP.zw'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:movies/:page?', {
			templateUrl: 'movies-list/view.html',
			controller: 'theatersCtrl'
		});
	}])

	.controller('theatersCtrl', ['$scope','$http','zwServers','$routeParams','$route', function($scope,$http,zwServers,$routeParams,$route) {
		$scope.subjects =[];
		// $http({

		// 	//离线数据
		// 	method:'GET',
		// 	url:'/moviecat/angular-boilerplate/app/JSON/moviecat.json'

		// 	//在线数据
			// url:'https://localhost:1337/api.douban.com/v2/movie/in_theaters'
		// })
		// .then(function (response) {
		// 	// body...
		// 	console.log(response);
		// 	$scope.subjects = response.data.subjects;
		// 	$scope.title = response.data.title;
		// }, function (response) {
		// 	// body...
		// 	console.log(response);
		// 	console.log('获取失败');
		// });
		// 
		//翻页功能
		var begin = $routeParams.page;
		$scope.begin = $routeParams.page;
		$scope.next = function () {
			// body...
			if (begin<$scope.pages) {
				$route.updateParams({
					page:++begin
				});
			}
			console.log(begin);
		};

		//返回
		$scope.prior = function () {
			// body...
			console.log(begin);
			if (begin>1) {
				$route.updateParams({
					page:--begin
				});	
			}
			return begin;
			
		};

		//动态从界面获取路由，向服务器提交动态地址
		$scope.movies = $routeParams.movies;

		// console.log($scope.movies);
		$scope.loading = true;
		var dataPath = 'https://api.douban.com/v2/movie/'+$scope.movies;

		zwJsonp(dataPath,{
			count:3,
			start:($routeParams.page-1)*3,
			q:$routeParams.q
		},function(data) {
				// body...
				// console.log(data);//这里就获取到服务器的数据了
				if(data.msg){
					console.log(data.msg);
				}else{
					$scope.subjects = data.subjects;
					$scope.title = data.title;
					$scope.loading = false;
					$scope.total = data.total;
					$scope.pages =Math.ceil($scope.total/3);//向上取整
					$scope.$apply();// 强制同步数据到界面
				// console.log($scope.title);
				// console.log($scope.subjects);
			}
			
		});
				// console.log($scope.subjects);
				// 因为function是一个回调函数，
				// 所以要对$scope进行整理，$scope.$apply();
				
		$scope.hide = function () {
			// body...
			$scope.loading = false;
		};
			}]);
})(angular);