(function (angular) {
	// body...
	'use strict';
	var zwAPP = angular.module('moviecatAPP.zw', []);
	zwAPP.service('zwServers', ['$document','$window', function($document,$window){
		this.zwJsonp = function (url,data,callback) {
		// body...
		//定义函数名
		var fnName = 'zw_jsonp_cb_'+Math.random().toString().replace('.','')+'_'+new Date().getTime();
		// console.log(fnName);
		$window[fnName] = callback;//挂载在window上
		//将取到的data数据转为url参数形式
		var queryString = url.indexOf('?')==-1?"?":'&';
		//判断的代码，字符冲==‘一个数’？‘’：‘’
		// 一个获取url上查询条件的方法。
		// ？号后面是查询参数。
		// indexOf()--》返回字符串中要查询的子字符串的位置，没找到则返回-1
		// url.indexOf("?")!=-1 //找到了。既然找到问号，就代表url里有查询字符串
		for( var key in data){
			queryString += key +"="+data[key]+"&";
		}
		// console.log(queryString);

		queryString +="callback="+fnName;
		var myUrl = url += queryString;
		// console.log(myUrl);

		// 创建script
		var scriptEle = $document[0].createElement('script');
		scriptEle.src = myUrl;
		// console.log(scriptEle);
		//插入body的底部
		$document[0].body.appendChild(scriptEle);
		
	}
	$window.zwJsonp = this.zwJsonp;//将自定义的的方法挂载在window对象上
	}]);
})(angular)