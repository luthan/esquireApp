/* global myApp */
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
myApp.controller('StaffController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, $firebaseUtils, FIREBASE_URL, $rootScope, $routeParams, $filter){
		
		var ref = new Firebase(FIREBASE_URL + '/staff/');
		var dataObject = $firebaseObject(ref);
		var dataArray = $firebaseArray(ref);
		var staffArray = [];
		var availabilityDay;
		var timeOffDateObject;
		var timeOffDate;
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
		
		dataObject.$loaded().then(function(){
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
		
		$scope.editAvailabilitySlot = function(editStaffId, day, timeSlot){	
			var ref = new Firebase(FIREBASE_URL + '/staff/' + $scope.editStaffId + '/availability/' + day);
			availabilityDay = $firebaseObject(ref);
			availabilityDay.$loaded().then(function(){
				if(availabilityDay.$value != null){
					if(availabilityDay.$value.indexOf('['+timeSlot+']') > -1){
						availabilityDay.$value = availabilityDay.$value.replace('['+timeSlot+']', "");
					} else {
						availabilityDay.$value += '[' + timeSlot + ']';
					}
				} else {
					availabilityDay.$value += '[' + timeSlot + ']';
				}
				availabilityDay.$save();
			});
		}
		
		$scope.disabled = function(date, mode) {
    		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 7 ) );
  		};
		
		$scope.dt = new Date();
		
		$scope.$watch('dt', function(){
			if($routeParams.staffId){
				$scope.dayOfWeek = daysOfWeek[$scope.dt.getDay()];
				var ref = new Firebase(FIREBASE_URL + '/staff/' + $routeParams.staffId + '/availability/' + daysOfWeek[$scope.dt.getDay()]);
				availabilityDay = $firebaseObject(ref);
				var ref = new Firebase(FIREBASE_URL + '/staff/' + $routeParams.staffId + '/timeoff/' + $filter('date')($scope.dt, "MM-dd-yyyy"));
				timeOffDateObject = $firebaseObject(ref);
				timeOffDateObject.$loaded().then(function(){
					if(timeOffDateObject.$value != null){
						$scope.timeOffSlots = timeOffDateObject.$value;
					} else {
						console.log(availabilityDay.$value);
						if(availabilityDay.$value == null){
							timeOffDateObject.$value = "";
						} else {
							timeOffDateObject.$value = availabilityDay.$value;
						}
					}
					timeOffDateObject.$save();
					$scope.timeOffSlots = timeOffDateObject.$value;
				});	
			}
			
		});
		
		$scope.takeTimeOff = function(timeSlot){
			if(timeOffDateObject.$value.indexOf(timeSlot) > -1){
				timeOffDateObject.$value = timeOffDateObject.$value.replace('['+timeSlot+']', '');
			} else {
				 timeOffDateObject.$value += '[' + timeSlot + ']';
			}
			timeOffDateObject.$save();
			$scope.timeOffSlots = timeOffDateObject.$value;
		}
});
		