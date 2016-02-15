angular.module('homework', [
	'ui.router',
	// 'ui.materialize'
	])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider

	.state('home', {
		url: '/',
		templateUrl: 'views/signinView.html',
		controller: 'SigninController as sign'
	})

	.state('assignmentlist', {
		url: '/assignmentlist',
		templateUrl: 'views/assignmentListView.html',
		// controller: 'Assignment as asign'
	})

	.state('assignment', {
		url: '/assignment',
		templateUrl: 'views/assignmentView.html',
		// controller: 'Assignment as asign'
	})
	.state('newassignment', {
		url: '/newassignment',
		templateUrl: 'views/newAssignmentView.html',
		controller: 'NewAssignmentController'
	})

	$urlRouterProvider.otherwise('/');
}])