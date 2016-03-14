angular.module('homework') 
	.controller('StudentListController', ['$scope', 'User', function($scope, User) {
		
		$scope.allStudents = User.data
		

	}])