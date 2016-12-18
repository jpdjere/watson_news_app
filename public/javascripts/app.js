var app = angular.module('angularjsNodejsTutorial', []);

app.controller('myController', function($scope, $http, $sce){

	$scope.nytRequest = 'Donald Trump';
	$scope.apiResponse = [];

	$scope.runRequest = function(){

		$("#loader").removeClass("hidden-div");
		$("#loader").addClass("show-div");
		$(".articleContainer").removeClass("show-div");
		$(".articleContainer").addClass("hidden-div");
		$(".watsonAnalysis").removeClass("show-div");
		$(".watsonAnalysis").addClass("hidden-div");

		var request = $http({
							    url: '/nyt', 
							    method: "GET",
							    params: {city: $scope.nytRequest}
							 });

		request.then(function(data){
			console.log(data);

			$scope.apiResponse = data.data;
			
			$("#loader").removeClass("show-div");
			$("#loader").addClass("hidden-div");
			$(".articleContainer").removeClass("hidden-div");
			$(".articleContainer").addClass("show-div");
			$(".watsonAnalysis").removeClass("hidden-div");
			$(".watsonAnalysis").addClass("show-div");

		},function(data){//Second function handles error
			console.log('Error: ' + data);
			alert("No data");
		})


	}

	$scope.runRequest();

})

