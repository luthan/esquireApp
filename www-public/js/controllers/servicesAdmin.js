myApp.controller('ServicesAdminController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URL, $rootScope, $routeParams){
		
		
		var ref = new Firebase(FIREBASE_URL);
		
		var authObj = $firebaseAuth(ref).$getAuth();
		
		if(authObj){
			var user = authObj.uid;
			
			var ref = new Firebase(FIREBASE_URL + '/services/');
			var servicesObj = $firebaseObject(ref);
			var servicesArray = $firebaseArray(ref);
	
			servicesObj.$loaded().then(function(){
				$scope.services = servicesObj;
			});  //services object loaded
		
			servicesArray.$loaded().then(function(){
				$rootScope.howManyServices = servicesArray.length;
				console.log("array loaded");
			});
			
			servicesArray.$watch(function(event){
				$rootScope.howManyServices = servicesArray.length;
			});
			
			$scope.addService = function(){
				// var ref = new Firebase(FIREBASE_URL + '/services/');
				// var servicesArray = $firebaseArray(ref);
				
				servicesArray.$add({
					name: $scope.serviceName,
					description: $scope.serviceDescription,
					price: $scope.servicePrice,
					duration: $scope.serviceDuration,
					canBook: $scope.canBook,					
					date: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					$scope.serviceName = "";
					$scope.serviceDescription = "";
					$scope.servicePrice = "";
					$scope.serviceDuration = "";
					$scope.canBook = "";
				});
			} //add service
			
			$scope.deleteService = function(id){
				var ref = new Firebase(FIREBASE_URL + '/services/' + id);
				var serviceObj = $firebaseObject(ref);
				serviceObj.$remove();
			} //delete service
			

		}
		
	
});  //servicesController