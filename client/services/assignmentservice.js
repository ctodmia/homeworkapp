angular.module('homework')
	.factory('Assign', ['$http', function($http) {
		obj = {}

		obj.addNew = function(item) {
			console.log('this is item', item)
			return $http.post('/newassignment', item)
		};

		obj.allWork = function() {
			return $http.get('/allhomework').then(function(data) {
				// console.log('this is what we got back', data);
				return data;
			});
		};

		obj.getOne = function(id) {
			return $http.get('/individualwork' + id).then(function(res) {
				console.log('this is res', res)
			})
		}

		return obj; 
	}])