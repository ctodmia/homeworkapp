angular.module('homework')
	.controller('SigninController',['$scope', '$state', 'Auth', function($scope, $state, Auth){
		$scope.user = {};
		$scope.login = function(username) {
			Auth.login({username: username}).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('studentlist');
			});

		};

		$scope.signup = function(user) {
			console.log('user wants to sign up', user);

			Auth.register({
				firstname: user.firstname, 
				lastname: user.lastname, 
				username: user.username,
				usertype: user.usertype
			}).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('studentlist');
			});
		};


		console.log('this is the home controller')

	}])