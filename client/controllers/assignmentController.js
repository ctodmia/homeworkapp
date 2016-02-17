angular.module('homework')
	.controller('AssignmentController', ['$scope', '$state', 'Topic', 'Auth', 'Assign',  function($scope, $state, Topic, Auth, Assign) {
		$scope.permission = false; 
		var currentUser = Auth.currentUser();
		$scope.answer = {}
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

		$scope.submitAnswer = function(data) {
			Assign.addAnswer(Topic._id, {
				body: data.body,
				author: Auth.currentUser(),
				topic: Topic._id
			}).success(function(data) {
				console.log('this was successfully submitted answer', data)
			})
			console.log('this is the submitted answer', data);
			$scope.answer.body = '';
		}
		console.log('this is the current user', Auth.currentUser())
	}])