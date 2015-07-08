myApp.controller('AppointmentsController', function($scope, $firebaseObject, $firebaseArray){
	var ref = new Firebase('https://esquirebarbershop.firebaseio.com/appointments');
	
	var appointments = $firebaseObject(ref);
	var array = $firebaseArray(ref);
	
	$scope.appointments = appointments;
	
	$scope.addAppt = function(){
		array.$add({
			name: $scope.apptname,
			date: Firebase.ServerValue.TIMESTAMP
		}).then(function(){
			$scope.apptname = "";
		});
	} //add appointment
	
	$scope.deleteAppt = function(id){
		array.$remove(id);
		console.log(id);
		// array.$remove(key);
	} //delete appointment
	
});  //AppointmentsController