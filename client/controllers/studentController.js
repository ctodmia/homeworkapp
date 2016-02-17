angular.module('homework')
	.controller('StudentController', ['$scope', 'User', function($scope, User) {

		$scope.allWork = User.questions;
		$scope.response = [];
		
		$scope.findanswers = function(res) {
			$scope.response = [];
			for(var i=0; i<res.length; i++) {
				if(res[i]._creator === User.user._id) {
					$scope.response.push(res[i].response);
				} else {
					$scope.response = "this student has not responded yet";
				}
			}
		};

	}])