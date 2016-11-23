(function (angular){
	'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecatAPP', [
	'ngRoute',
	'myApp.movie_detail',
	'moviecatAPP.movies'
	
	// 'moviecatAPP.coming_soon',
	// 'moviecatAPP.top250'
	])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.otherwise({redirectTo: '/in_theaters/1'});//重定向
}])

.controller('main_search',['$scope','$route',function($scope,$route){
	
	$scope.searchInp='';
	$scope.search=function(){
		$route.updateParams({
			movies:'search',
			q:$scope.searchInp
		})
		$scope.searchInp='';
	}
}])
		//自定义指令
.directive('auto', ['$location',function($location){
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		link: function($scope, iElm, iAttrs, controller) {
			// console.log(iElm);
			// console.log($location.path())
			$scope.$location = $location;//把$location强行挂载$scope上
			$scope.$watch('$location.path()', function(newValue, oldValue) {
				var ielm =iAttrs.href.substr(1);
				// console.log(ielm);
				if (newValue.startsWith(ielm)) {
					iElm.parent().parent().children().removeClass(iAttrs.auto);//选中所有的li元素。
					iElm.parent().addClass(iAttrs.auto);

				}
			});
		}
	};
}]);

})(angular);
