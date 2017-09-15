angular.module('sampleApp')
	.controller('loginController', ['$scope', '$rootScope','getService', function($scope, $rootScope, getService){

			$scope.showLoginButton = false;
			$scope.profile = {};
			$rootScope.showAlert = false;

			$scope.fnRedirectLogin = function(){
				location.href = location.pathname;
				$scope.showLoginButton = false;
			};

			$scope.fnRedirectContact = function(){
				location.href = location.pathname + location.hash +'contact';
				$scope.showLoginButton = true;
			};

			$scope.fnRedirectForgot = function(){
				location.href = location.pathname + location.hash +'forgotPassword';
				$scope.showLoginButton = true;
			};

			$scope.fnLoginValidate = function(){
				var url = "http://localhost:8080/login?username=" + $scope.profile.uname + "&password=" + $scope.profile.pwd;
				getService.fnGetData(url).then(function(response){
					if(response.data.loginSucceeded){
						var encryptedProfile = CryptoJS.AES.encrypt( $scope.profile.uname, 'QWERTYUIOP').toString();
						localStorage.setItem('username',encryptedProfile);
						var encryptedSession = CryptoJS.AES.encrypt( response.data.sessionId, 'QWERTYUIOP').toString();
						localStorage.setItem('sessionId',encryptedSession);
						location.href = 'dashboard.html#/';
					}	
					else{
						window.scroll(0,0);
						$rootScope.showAlert = true;
						$rootScope.alertType = 'Danger';
						$rootScope.alertMessage = response.message;
					}
				});
			};

		}]);