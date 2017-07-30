
var ngModule = angular.module('arthatic', ["ngRoute"]);

ngModule.constant('ENV', 'dev');
ngModule.constant('APP_NAME', 'arthatic');

// Example configuration stored as constant
ngModule.constant('config', {  
  apiUrl: __env.apiUrl,
  baseUrl: '/',
  enableDebug: false
});


ngModule.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "index.htm"
    })
    .when("/login", {
        templateUrl : "login.htm"
    })
    .when("/myprofile", {
        templateUrl : "myprofile.htm"
    })
    .when("/register", {
        templateUrl : "register.htm"
    });
});