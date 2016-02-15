angular.module('homework')
	.controller('AssignmentController', ['$scope', 'Topic', function($scope, Topic) {
		console.log('this is topic', Topic )
		$scope.topic = Topic; 
	}])