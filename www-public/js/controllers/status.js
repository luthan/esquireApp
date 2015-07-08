myApp.controller('StatusController', function($scope, $rootScope, $firebaseAuth, FIREBASE_URL, Authentication, $location){
	
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);
	
	$scope.logout = function(){
		Authentication.logout();
	} //logout
	
	authObj.$onAuth(function(authData){
		if(authData){
			$scope.email = authData.password.email;
		} else{
			$scope.email = null;
			$location.path('/login');
		}
	}); //onAuth detector
});