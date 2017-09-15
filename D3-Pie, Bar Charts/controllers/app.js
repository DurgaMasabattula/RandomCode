angular.module('sampleApp',['ngRoute'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/',{
			templateUrl:'views/charts.html'
		})
		.when('/pieChart',{
			templateUrl : 'views/pieChart.html'
		})
		.when('/barChart',{
			templateUrl : 'views/barChart.html'
		})
		.when('/salesOrders',{
			templateUrl : 'views/salesOrders.html'
		})
		.when('/salesMen',{
			templateUrl : 'views/salesMen.html'
		});
	}])
	.run([function(){
		if(location.href.indexOf('dashboard.html') > -1){
			if(!localStorage.getItem('sessionId') && !localStorage.getItem('username')){
				location.href = 'index.html';
			}
		}
	}]);