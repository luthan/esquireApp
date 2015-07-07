/// <reference path="../../typings/angularjs/angular.d.ts"/>
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
		$routeProvider
		.when('/register' , {
			templateUrl: 'views/register.html',
			controller: 'RegisterController'
		});
	}]);
// console.log("test");