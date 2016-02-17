angular.module('homework')
	.controller('AssignmentController', ['$scope', '$state', 'Topic', 'Auth', 'Assign',  function($scope, $state, Topic, Auth, Assign) {
		
		$scope.permission = false; 
		$scope.answer = {};
		$scope.topic = Topic; 
		var currentUser = Auth.currentUser();
		
		$scope.reg = function(data) {
			data = true; 
			$state.go('home')
		}

		$scope.submitAnswer = function(data) {
			Assign.addAnswer(Topic._id, {
				body: data.body,
				author: Auth.currentUser(),
				topic: Topic._id
			}).success(function(data) {
				$scope.answer.body = '';
			})
		}

		if(currentUser){
			$scope.permission = true;
		} else {
			$scope.permission = false;
		}
		
	}])