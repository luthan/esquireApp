/// <reference path="../../typings/angularjs/angular.d.ts"/>
var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'appControllers'])
.constant('FIREBASE_URL','https://esquirebarbershop.firebaseio.com');

var appControllers = angular.module('appControllers',['firebase']);

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
		.when('/appointments', {
			templateUrl: 'views/appointments.html',
			controller: 'AppointmentsController'
		})
		.otherwise({
			redirectTo: '/appointments'
		});
	}]);