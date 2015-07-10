myApp.controller('EditServiceController', 
	function($scope, $firebaseObject, $firebaseArray, $firebaseAuth, FIREBASE_URL, $rootScope, $routeParams){
		
		var ref = new Firebase(FIREBASE_URL);
		var authObj = $firebaseAuth(ref).$getAuth();
		
		if(authObj){
			
			var ref = new Firebase(FIREBASE_URL + '/services/' + $routeParams.serviceId);
			$scope.service = $firebaseObject(ref);
			console.log($scope.service);
			// find service
			
			var ref = new Firebase(FIREBASE_URL + '/services/');
			$scope.services = $firebaseObject(ref);
			
			$scope.editService = function(id){
				console.log(id);
				var ref = new Firebase(FIREBASE_URL + '/services/' + id);
				var saveObject = $firebaseObject(ref);
				saveObject.name = $scope.service.name;
				saveObject.description = $scope.service.description;
				saveObject.price = $scope.service.price;
				saveObject.duration = $scope.service.duration;
				saveObject.canBook = $scope.service.canBook;
				saveObject.$save();

				// saveObject.$save({
				// 	name: $scope.service.name,
				// 	description: $scope.service.description,
				// 	price: $scope.service.price,
				// 	duration: $scope.service.duration,
				// 	canBook: $scope.service.canBook
				// });
				console.log("saved");
				
				
			}
		}
		
	
});  //servicesController