myApp.controller('RegisterController', 
	function($scope, $location, $firebaseAuth, $firebaseArray, Authentication){
		var ref = new Firebase("https://esquirebarbershop.firebaseio.com");
		var authObj = $firebaseAuth(ref);
		var x = new Firebase("https://esquirebarbershop.firebaseio.com/users");
		var users = $firebaseArray(x);
		
		
		
		$scope.login = function(){
			Authentication.login($scope.user)
			.then(function(authData){
				console.log("YOURE LOGGED IN");
				$location.path('/appointments');
			}).catch(function(error){
				$scope.message = error.toString();
			});
			
		} //login
		
		$scope.logout = function(){
			Authentication.logout();
		} //logout
		
		$scope.isLoggedIn = function(){
			return Authentication.isLoggedIn();
		}
		
		$scope.register = function(){
			Authentication.register($scope.user)
			.then(function(authData){
				$location.path('/appointments');
			}).catch(function(error){
				$scope.message = error.toString();
			});
		}
			// authObj.$createUser({
			// 	email: $scope.user.email,
			// 	password: $scope.user.password
			// }).then(function(userData){
			// 	// console.log(userData);
			// 	users.$add({
			// 		userID: userData.uid,
			// 		firstName: $scope.user.firstName,
			// 		lastName: $scope.user.lastName
			// 	});
			// 	return authObj.$authWithPassword({
			// 		email: $scope.user.email,
			// 		password: $scope.user.password
			// 	});
			// }).then(function(authData){
			// 	$location.path('/appointments');
			// }).catch(function(error){
			// 	$scope.message = error.toString();
			// });
			
		//} //register
		
});