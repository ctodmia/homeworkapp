angular.module('homework')
	.factory('Assign', ['$http', function($http) {
		
		obj = {};

		obj.addNew = function(item) {
			return $http.post('/newassignment', item);
		};

		obj.allWork = function() {
			return $http.get('/allhomework').then(function(data) {
				return data;
			});
		};

		obj.getOne = function(id) {
			return $http.get('/individualwork/' + id).then(function(res) {
				return res.data;
			});
		};

		obj.addAnswer = function(id, answer) {
			return $http.post('/individualwork/'+ id + '/answer', answer);s
		};

		return obj; 

	}])