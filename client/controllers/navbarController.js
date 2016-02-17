angular.module('homework')
	.controller('NavbarController', ['$scope', 'Auth', function($scope, Auth) {
		$scope.register = false;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.currentUser = Auth.currentUser;
		// console.log('this is the currentUser', $scope.currentUser)
		$scope.logout = Auth.logout;

		$scope.newUser = function() {
			$scope.register = true; 
		};
		$scope.loginUser = function() {
			$scope.register = false;
		}
	}])