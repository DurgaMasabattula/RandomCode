angular.module('sampleApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: 'views/login.html'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html'
            })
            .when('/forgotPassword', {
                templateUrl: 'views/forgot-password.html'
            });
    }])
    .run([(function() {
        if (location.href.indexOf('index.html') > -1){
            if (localStorage.getItem('username') && localStorage.getItem('sessionId')) {
                location.href = "dashboard.html";
            }
        }
    })]);
