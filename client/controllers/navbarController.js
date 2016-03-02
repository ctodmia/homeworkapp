angular.module('homework')
	.controller('NavbarController', ['$scope', 'Auth', '$state', function($scope, Auth, $state) {
		
		$scope.userIn = false;
	
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.currentUser = Auth.currentUser();
		$scope.logout = function(){
			Auth.logout();
			$scope.userIn = false;
			$state.go('login');
		}

		$scope.newUser = function() {
			$scope.register = true; 
		};

		$scope.loginUser = function() {
			$scope.register = false;
			$state.go('login');
		};

		if($scope.currentUser){
			$scope.userIn = true;
		} else {
			$scope.userIn = false;
		}

		$scope.user = {};
		$scope.returnuser = {};
		
		$scope.login = function(user) {
			Auth.login(user).error(function(error) {
				$scope.error = error;
			}).then(function() {
				$state.go('assignmentlist');
			});
				$scope.userIn = true;
				console.log('where is this happneing')

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