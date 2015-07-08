myApp.factory('Authentication',function($firebaseAuth,$firebaseArray,$location,FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);

	var myObject = {
		login : function(user){
			return authObj.$authWithPassword({
				email: user.email,
				password: user.password
			});
		} //login
	} //myobject
	return myObject;
	
})