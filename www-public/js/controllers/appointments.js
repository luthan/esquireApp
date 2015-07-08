myApp.controller('AppointmentsController', function($scope, $firebaseObject, FIREBASE_URL, $firebaseArray){
	var ref = new Firebase(FIREBASE_URL + '/appointments');
	
	// var appointments = $firebaseObject(ref);
	var appointments = $firebaseArray(ref);
	
	$scope.appointments = appointments;
	
	$scope.addAppt = function(){
		appointments.$add({
			name: $scope.apptname,
			date: Firebase.ServerValue.TIMESTAMP
		}).then(function(){
			$scope.apptname = "";
		});
	} //add appointment
	
	$scope.deleteAppt = function(id){
		appointments.$remove(id);
		console.log(id);
		// array.$remove(key);
	} //delete appointment
	
});  //AppointmentsController