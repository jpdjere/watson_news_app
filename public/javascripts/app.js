var app = angular.module('angularjsNodejsTutorial', []);

app.controller('myController', function($scope, $http, $sce){

	$scope.nytRequest = 'Diego Maradona';
	$scope.apiResponse = [];

	$scope.runRequest = function(){

		$("#loader").removeClass("hidden-div");
		$("#loader").addClass("show-div");
		$("#answerContent").removeClass("show-div");
		$("#answerContent").addClass("hidden-div");

		var request = $http({
							    url: '/nyt', 
							    method: "GET",
							    params: {city: $scope.nytRequest}
							 });

		request.success(function(data){
			console.log(data);
			$scope.apiResponse = data;
			
			$("#loader").removeClass("show-div");
			$("#loader").addClass("hidden-div");
			$("#answerContent").removeClass("hidden-div");
			$("#answerContent").addClass("show-div");

		})

		request.error(function(data){
			console.log('Error: ' + data);
			alert("No data");
		})

	}

	$scope.runRequest();

})

