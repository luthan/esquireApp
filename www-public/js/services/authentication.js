myApp.factory('Authentication',function($rootScope,$firebaseAuth,$firebaseArray,$location,FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);

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
		},
		
		isLoggedIn : function(){
			return authObj.$getAuth();
		}
		
	} //myobject
	return myObject;
	
})