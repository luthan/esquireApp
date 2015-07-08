myApp.controller('RegisterController', 
	function($scope, $location){
		$scope.login = function(){
			$location.path('/appointments')
		} //login
		
		$scope.register = function(){
			
		} //register
		
});