angular.module('sampleApp')
	.controller('footerController',['$scope', '$rootScope', function($scope, $rootScope){

		$rootScope.showAlert = false;

		$scope.fnShowModal = function(item){
			if(item == 'privacy'){
				$scope.modalTitle = "Privacy Policy";
				$scope.modalContent = "Some Privacy Policies";
			}
			else if(item == 'terms'){
				$scope.modalTitle = "Terms Of Use";
				$scope.modalContent = "Some Terms of Use";
			}
			angular.element('#footerStaticModal').modal({show:true, backdrop: 'static', keyboard: true});
		};

		$scope.fnShowSupportModal = function(){
			angular.element('#footerSupportModal').modal({show:true, backdrop: 'static', keyboard: true});
		};

		$scope.fnSendSupport = function(){
			angular.element('#footerSupportModal').modal('hide');
			window.scroll(0,0);
			$rootScope.showAlert = true;
			$rootScope.alertType = 'Success';
			$rootScope.alertMessage = "Your Request has been sent Successfully";
		};

	}]);