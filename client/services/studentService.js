angular.module('homework')
	.factory('Student', ['$http', function($http) {
		var user = {};

		user.getAll = function() {
			return $http.get('/getAllUsers').then(function(users) {
				return users;
			});
		};

		return user;
	}])