angular.module('sampleApp')
    .controller('headerController', ['$scope', 'getService', '$http', '$compile', function($scope, getService, $http, $compile) {

        $scope.fnInit = function() {
            var encryptedProfile = localStorage.getItem('username');
            $scope.userName = CryptoJS.AES.decrypt(encryptedProfile, "QWERTYUIOP").toString(CryptoJS.enc.Utf8);

            var encryptedSession = localStorage.getItem('sessionId');
            $scope.sessionId = CryptoJS.AES.decrypt(encryptedSession, "QWERTYUIOP").toString(CryptoJS.enc.Utf8);

            $scope.barChartURL = "http://localhost:8080/lastyeardata?sessionid=" + $scope.sessionId;
            $scope.pieChartURL = "http://localhost:8080/salesmandata?sessionid=" + $scope.sessionId;
            $scope.salesOrderURL = "http://localhost:8080/topsalesorders?sessionid=" + $scope.sessionId;
            $scope.salesMenURL = "http://localhost:8080/topsalesmen?sessionid=" + $scope.sessionId;
            $scope.pieObject = {
                "chartUrl": $scope.pieChartURL,
                "height": 300
            };
            $scope.barObject = {
                "chartUrl": $scope.barChartURL,
                "height": 300
            };
            $scope.salesMenBarObject = {
                "chartUrl": $scope.salesMenURL,
                "height": 300
            };
            $scope.pieBigObject = {
                "chartUrl": $scope.pieChartURL,
                "height": 800
            };
            $scope.barBigObject = {
                "chartUrl": $scope.barChartURL,
                "height": 1000
            };
            $scope.salesMenBigBarObject = {
                "chartUrl": $scope.salesMenURL,
                "height": 1000
            };
        };

        $scope.fnViewBigChart = function(type) {
            location.href = location.pathname + location.hash + type;
        };

        $scope.fnViewDashboard = function() {
            location.href = location.pathname;
        }

        $scope.fnLogout = function() {
            var url = "http://localhost:8080/logout?sessionid=" + $scope.sessionId;
            $http.get(url);
            location.href = 'index.html';
            localStorage.clear();
        };

        $scope.fnInit();

    }]);
