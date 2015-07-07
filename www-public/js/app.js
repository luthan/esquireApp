/// <reference path="../../typings/angularjs/angular.d.ts"/>
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/register' , {
			templateUrl: 'views/register.html',
			controller: 'RegisterController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegisterController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}]);
// console.log("test");