angular.module('homework')
	.factory('Assign', ['$http', function($http) {
		obj = {}

		obj.addNew = function(item) {
			return $http.post('/newassignment', item)
		}
	}])