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
			return $http.get('/individualwork/' + id).then(function(res) {
				return res.data;
			})
		}
		obj.addAnswer = function(id, answer) {
			console.log('this is new add answer', answer);
			console.log('proper topic question id', id)
			return $http.post('/individualwork/'+ id + '/answer', answer)
		}

		return obj; 
	}])