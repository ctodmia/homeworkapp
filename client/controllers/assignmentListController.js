angular.module('homework')
	.controller('AssignmentListController', ['$scope', 'Work', 'Auth', function($scope, Work, Auth) {
		
		$scope.allWork = Work.data;
		$scope.userIn = true;
		
	}])