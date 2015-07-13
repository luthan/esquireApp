myApp.controller('StatusController', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, Authentication, $location){
	
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);
	// console.log($rootScope.howManyAppointments);
	
	$scope.logout = function(){
		Authentication.logout();
	} //logout
	
	authObj.$onAuth(function(authData){
		if(authData){
			$scope.email = authData.password.email;
			var ref = new Firebase(FIREBASE_URL + '/users/' + authData.uid + '/appointments/');
			var appointmentsArray = $firebaseArray(ref);
			
			var ref = new Firebase(FIREBASE_URL + '/services/');
			var servicesArray = $firebaseArray(ref);
			
			var ref = new Firebase(FIREBASE_URL + '/staff/');
			var staffArray = $firebaseArray(ref);
			
			appointmentsArray.$loaded().then(function(){
				$scope.appointments = $firebaseArray(ref);
				$rootScope.howManyAppointments = appointmentsArray.length;
			});
			
			appointmentsArray.$watch(function(event){
				$rootScope.howManyAppointments = appointmentsArray.length;
			});
			
			servicesArray.$loaded().then(function(){
				$scope.services = $firebaseArray(ref);
				$rootScope.howManyServices = servicesArray.length;
			});
			
			servicesArray.$watch(function(event){
				$rootScope.howManyServices = servicesArray.length;
			});
			
			staffArray.$loaded().then(function(){
				$scope.staff = $firebaseArray(ref);
				$rootScope.howManyStaff = staffArray.length;
			});
			
			staffArray.$watch(function(event){
				$rootScope.howManyStaff = staffArray.length;
			});
			
		} else{
			$scope.email = null;
			$location.path('/login');
		}
	}); //onAuth detector
});