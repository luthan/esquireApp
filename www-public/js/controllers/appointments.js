myApp.controller('AppointmentsController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URL, $rootScope){
		
		
		var ref = new Firebase(FIREBASE_URL);
		
		var authObj = $firebaseAuth(ref).$getAuth();
		
		if(authObj){
			var user = authObj.uid;
			var ref = new Firebase(FIREBASE_URL + '/users/' + user + '/appointments/');
			// var appointmentsObj = $firebaseObject(ref);
			var appointmentsArray = $firebaseArray(ref);
	
			// appointmentsObj.$loaded().then(function(){
			// 	$scope.appointments = appointmentsObj;
			// });  //appointments object loaded
		
			appointmentsArray.$loaded().then(function(){
				$scope.appointments = $firebaseArray(ref);
				$rootScope.howManyAppointments = appointmentsArray.length;
			});
			
			appointmentsArray.$watch(function(event){
				$rootScope.howManyAppointments = appointmentsArray.length;
			});
		
			// var appointments = $firebaseObject(ref);
			
			//$scope.appointments = $firebaseArray(ref);
			
			$scope.addAppt = function(){
				appointmentsArray.$add({
					name: $scope.apptname,
					date: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					$scope.apptname = "";
				});
			} //add appointment
			
			$scope.deleteAppt = function(id){
				appointmentsArray.$remove(id);
			} //delete appointment
		}
		
	
});  //AppointmentsController