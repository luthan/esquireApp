/* global myApp */
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
myApp.controller('StaffController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URL, $rootScope, $routeParams){
		
		var ref = new Firebase(FIREBASE_URL + '/staff/');
		var dataObject = $firebaseObject(ref);
		var dataArray = $firebaseArray(ref);
		var staffObject = {};
		var staffArray = [];
		
		dataObject.$loaded().then(function(){
			staffObject = dataObject;
		});
		
		dataArray.$loaded().then(function(){
			staffArray = dataArray;
		});
		
		dataArray.$watch(function(event){
			$scope.staffDisplayList = dataObject;
		});
		
		$scope.addStaff = function(){
			staffArray.$add({
				name: $scope.staffName,
				availability: {sunday: "",monday: "",tuesday: "",wednesday: "",thursday: "",friday: "",saturday: ""}
			}).then(function(){
				$scope.staffName = "";
			});
		}
		
		$scope.timeSlots = ["7:00 am", "7:30 am", "8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm", "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm"];
		var daysOfWeek = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
		if($routeParams.staffId){
			$scope.editStaffId = $routeParams.staffId;
			var ref = new Firebase(FIREBASE_URL + '/staff/' + $routeParams.staffId);
			var staffMember = $firebaseObject(ref);
			
			staffMember.$loaded().then(function(){
				$scope.staffMember = staffMember;
			});
		}
		
		
		
		
		$scope.editAvailabilitySlot = function(editStaffId, day, timeSlot){	
			var ref = new Firebase(FIREBASE_URL + '/staff/' + $routeParams.staffId + '/availability/' + day);
			var availabilityDay = $firebaseObject(ref);
			availabilityDay.$loaded().then(function(){
				if(availabilityDay.$value.indexOf('['+timeSlot+']') > -1){
					availabilityDay.$value = availabilityDay.$value.replace('['+timeSlot+']', "");
					availabilityDay.$save();
				} else {
					availabilityDay.$value += '[' + timeSlot + ']';
					availabilityDay.$save();
				}
			});
		}
		
		$scope.disabled = function(date, mode) {
    		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 7 ) );
  		};
		
		$scope.dt = new Date();
		
		$scope.$watch('dt', function(){
			$scope.dayOfWeek = daysOfWeek[$scope.dt.getDay()];
			console.log(daysOfWeek[$scope.dt.getDay()]);
			var ref = new Firebase(FIREBASE_URL + '/staff/' + $routeParams.staffId + '/availability/' + daysOfWeek[$scope.dt.getDay()]);
			var availabilityDay = $firebaseObject(ref);
		});



});
		