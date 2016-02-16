angular.module('homework')
	.controller('NavbarController', ['$scope', function($scope) {
		$scope.register = false;
		$scope.newUser = function() {
			$scope.register = true; 
		};
		$scope.loginUser = function() {
			$scope.register = false;
		}
	}])