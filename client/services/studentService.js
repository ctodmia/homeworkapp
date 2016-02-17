angular.module('homework')
	.factory('Student', ['$http', function($http) {
		
		var user = {};

		user.getAll = function() {
			return $http.get('/getAllUsers').then(function(users) {
				return users;
			});
		};

		user.getOne = function(id) {
			return $http.get('/individualstudent/' + id).then(function(res) {
				return res.data;
			});
		};

		return user;

	}])