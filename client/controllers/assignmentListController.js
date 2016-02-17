angular.module('homework')
	.controller('AssignmentListController', ['$scope', 'Work', function($scope, Work) {
		
		$scope.allWork = Work.data;
		
	}])