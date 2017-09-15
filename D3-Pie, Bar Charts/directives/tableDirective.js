angular.module('sampleApp')
	.directive('table',['getService', function(getService){
		return{
			restrict : 'A',
			scope:{
				tableUrl:'=table'
			},
			templateUrl:'views/tableTemplate.html',
			link: function(scope, element, attr){
				scope.fnInit = function(){
					if ($(element[0]).children().length > 1)
                        $(element[0]).children()[1].remove();
                    getService.fnGetChartData(scope.tableUrl).then(function(response) {
                        scope.salesOrderData = response.data.data;
                    });
				}
				scope.fnInit();
				scope.fnRemove = function(){
                    $(element).parent().remove();
                };
			}
		}
	}]);	