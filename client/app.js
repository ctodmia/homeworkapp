angular.module('homework', [
	'ui.router'
	])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'views/signupView.html',
		controller: 'NavbarController',
		resolve: {
			onEnter: ['$state', 'Auth', function($state, Auth) {
				if(Auth.isLoggedIn()) {
					$state.go('assignmentlist');
				}
			}]	
		}
	})

	.state('login', {
		url: '/login',
		templateUrl: 'views/signinView.html',
		controller: 'NavbarController',
		resolve: {
			onEnter: ['$state', 'Auth', function($state, Auth) {
				if(Auth.isLoggedIn()) {
					$state.go('assignmentlist');
				}
			}]	
		}
	})

	.state('studentlist', {
		url: '/studentlist',
		templateUrl: 'views/studentListView.html',
		controller: 'StudentListController',
		resolve: {
			User: ['Student', function(Student) {
				return Student.getAll();
			}]
		}
	})

	.state('student', {
		url: '/student/{id}',
		templateUrl: 'views/studentView.html',
		controller: 'StudentController',
		resolve: {
			User: ['$stateParams', 'Student', function($stateParams, Student) {
				return Student.getOne($stateParams.id);
			}]
		}
	})

	.state('assignmentlist', {
		url: '/assignmentlist',
		templateUrl: 'views/assignmentListView.html',
		controller: 'AssignmentListController',
		resolve: {
			Work: ['Assign', function(Assign) {
				return Assign.allWork();
			}]
		}
	})

	.state('assignment', {
		url: '/assignment/{id}',
		templateUrl: 'views/assignmentView.html',
		controller: 'AssignmentController',
		resolve: {
			Topic: ['$stateParams', 'Assign', function($stateParams, Assign) {
				return Assign.getOne($stateParams.id);
			}]

		}
	})

	.state('newassignment', {
		url: '/newassignment',
		templateUrl: 'views/newAssignmentView.html',
		controller: 'NewAssignmentController'
	})

	$urlRouterProvider.otherwise('/');

}])