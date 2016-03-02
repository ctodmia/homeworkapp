angular.module('homework')
	.controller('NewAssignmentController', ['$scope', 'Assign', '$state', function($scope, Assign, $state){
		
		var currentTime = new Date();
		$scope.currentTime = currentTime;
		$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
		$scope.disable = [false, 1, 7];
		$scope.today = 'Today';
		$scope.clear = 'Clear';
		$scope.close = 'Close';
		var days = 15;
		$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
		$scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();
		
		$scope.addWork = function () {
			Assign.addNew({
				title: $scope.title,
				question: $scope.question,
				date: $scope.currentTime
			}).success(function(data) {
				$scope.title = '';
				$scope.question = '';
				$state.go('assignmentlist');
			})
		};

	}])