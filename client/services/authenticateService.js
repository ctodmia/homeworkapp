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
				return payload.username;
			}
		};

		auth.register = function(user) {
			return $http.post('/signup', user).success(function(data) {
				auth.saveToken(data.token);
			});
		};

		auth.login = function(username) {
			return $http.post('/login', username).success(function(user) {
				auth.saveToken(user.token);
			});
		};

		auth.logout = function() {
			$window.localStorage.removeItem('homework-token');
		};

		return auth;

	}])