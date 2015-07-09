myApp.factory('Authentication',function($rootScope,$firebaseAuth,$firebaseArray,$location,FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);
	var x = new Firebase(FIREBASE_URL + "/users");

	var myObject = {
		login : function(user){
			return authObj.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(authData){
				$rootScope.$broadcast('$firebaseAuth:login', authData);
				// return authObj;
			});
		}, //login
		
		logout : function(){
			return authObj.$unauth();
		}, //logout
		
		isLoggedIn : function(){
			return authObj.$getAuth() != null;
		},
		
		register : function(user){
			return authObj.$createUser({
				email: user.email,
				password: user.password
			}).then(function(userData){
				var userInfo = {
					date: Firebase.ServerValue.TIMESTAMP,
					userID: userData.uid,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email
				}
				
				x.child(userData.uid).set(userInfo);
				
				return authObj.$authWithPassword({
					email: user.email,
					password: user.password
				});
			});
			
		} //register
		
	} //myobject
	
	$rootScope.isLoggedIn = function(){
		return myObject.isLoggedIn();
	}
	return myObject;
	
})