angular.module('homework')
	.controller('SigninController',['$scope', '$state', 'Auth', function($scope, $state, Auth){
		
		$scope.user = {};
		$scope.returnuser = {};
		
		$scope.login = function(user) {
			Auth.login(user).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('assignmentlist');
			});
		};

		$scope.signup = function(user) {
			Auth.register({
				firstname: user.firstname, 
				lastname: user.lastname, 
				username: user.username,
				usertype: user.usertype
			}).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('assignmentlist');
			});
		};

	}])