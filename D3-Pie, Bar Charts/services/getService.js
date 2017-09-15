angular.module('sampleApp')
	.factory('getService', ['$http', '$q', function($http, $q){

		var getService = {};

		getService.fnGetData = function(hit){
			var defer = $q.defer();
			$http.get(hit)
			.success(function(response){
				if(response.loginSucceeded){
					defer.resolve({
						data: response
					});
				}
				else{
					defer.resolve({
						data: response,
						'message':'Please Input Your Valid Credentials'
					});
				}
			})
			.error(function(){
				defer.reject({
					'status':500,
					'message': 'Internal Server Error'
				});
			})
			return defer.promise;
		};

		getService.fnGetChartData = function(hit){
			var defer = $q.defer();
			$http.get(hit)
			.success(function(response){
				if(response.resultDescription == 'SUCCESS'){
					defer.resolve({
						data: response
					});
				}
				else{
					defer.resolve({
						data: response,
						message: 'Please login to Access the Data'
					});
				}
			})
			.error(function(){
				defer.reject({
					'status':500,
					'message':'Internal Server error'
				});
			})
			return defer.promise;
		};

		return getService;
	}]);