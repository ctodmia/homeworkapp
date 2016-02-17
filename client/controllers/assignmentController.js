angular.module('homework')
	.controller('AssignmentController', ['$scope', '$state', 'Topic', 'Auth',  function($scope, $state, Topic, Auth) {
		$scope.permission = false; 
		var currentUser = Auth.currentUser();
		console.log('this is topic', Topic )
		$scope.topic = Topic; 
		if(currentUser){
			$scope.permission = true;

		}
		$scope.reg = function(data) {
			console.log('this is the reg data', data)
			data = true; 
			$state.go('home')
		}
		console.log('this is the current user', Auth.currentUser())
	}])