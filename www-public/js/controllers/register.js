myApp.controller('RegisterController', 
	function($scope, $location, $firebaseAuth, $firebaseArray, Authentication){
		var ref = new Firebase("https://esquirebarbershop.firebaseio.com");
		var authObj = $firebaseAuth(ref);
		var ref = new Firebase("https://esquirebarbershop.firebaseio.com/users");
		var users = $firebaseArray(ref);
		
		
		
		$scope.login = function(){
			Authentication.login($scope.user)
			.then(function(authData){
				// $location.path('/appointments');
				console.log(authData.uid);
			}).catch(function(error){
				$scope.message = error.toString();
			});
			
		} //login
		
		$scope.register = function(){
			authObj.$createUser({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function(userData){
				console.log(userData);
				users.$add({
					userID: userData.uid,
					firstName: $scope.user.firstName,
					lastName: $scope.user.lastName
				});
				return authObj.$authWithPassword({
					email: $scope.user.email,
					password: $scope.user.password
				});
			}).then(function(authData){
				$location.path('/appointments');
			}).catch(function(error){
				$scope.message = error.toString();
			});
			
		} //register
		
});