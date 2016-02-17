angular.module('homework')
	.factory('Auth', ['$http', '$window', function($http, $window) {
		var auth = {};

		auth.saveToken = function(token) {
			$window.localStorage['homework-token'] = token;
		};

		auth.getToken = function() {
			return $window.localStorage['homework-token'];
		};

		auth.isLoggedIn = function() {
			var token = auth.getToken();
			if(token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};

		auth.currentUser = function() {
			if(auth.isLoggedIn()) {
				var token = auth.getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				console.log('this is the payload.username from the current', payload.username);

				return payload.username;
			}
		};

		auth.register = function(user) {
			console.log('what is the reg user', user)
			return $http.post('/signup', user).success(function(data) {
				console.log('this is the registration data', data);
				auth.saveToken(data.token);
			})
		};

		auth.login = function(username) {
			console.log('this is username', username)
			return $http.post('/login', username).success(function(user) {
				console.log('this is the user we are looking for', user);
				auth.saveToken(user.token)
			});
		};

		auth.logout = function() {
			$window.localStorage.removeItem('homework-token');

		};



		return auth;
	}])