var app = angular.module('angularjsNodejsTutorial', []);

app.controller('myController', function($scope, $http, $sce){

	$scope.nytRequest = 'Barack Obama';
	$scope.apiResponse = [];
	$scope.storedData = {};

	$scope.runRequest = function(){

		$("#loader").css("display","block");
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

		request.then(function(data){//First function handles OK
			console.log("data es");
			console.log(data);

			$scope.apiResponse = data.data;
			var dataToPost = {
								title: $scope.apiResponse.news.response.docs[0].headline.main,
								subtitle: $scope.apiResponse.news.response.docs[0].lead_paragraph,
								tone: {
									anger: $scope.apiResponse.ana.document_tone.tone_categories[0].tones[0].score,
									disgust: $scope.apiResponse.ana.document_tone.tone_categories[0].tones[1].score,
									fear: $scope.apiResponse.ana.document_tone.tone_categories[0].tones[2].score,
									joy: $scope.apiResponse.ana.document_tone.tone_categories[0].tones[3].score,
									sadness: $scope.apiResponse.ana.document_tone.tone_categories[0].tones[4].score 
								}
							
			}

			console.log("dataToPost");
			console.log(dataToPost);
			
			$("#loader").removeClass("show-div");
			$("#loader").addClass("hidden-div");
			$("#loader").css("display","none");
			$(".articleContainer").removeClass("hidden-div");
			$(".articleContainer").addClass("show-div");
			$(".watsonAnalysis").removeClass("hidden-div");
			$(".watsonAnalysis").addClass("show-div");

			//hago el POST de la data
			$http.post('/api/news/', dataToPost)
				.then(function() {
					console.log("Post sucessful");
					$scope.displayDB();
				})   // success
				.catch(function() {
					console.log("Error on psoting data");
				}); // error

		},function(data){//Second function handles error
			console.log('Error: ' + data);
			alert("No data");
		})


	}

	$scope.displayDB = function(){

		var request = $http({
							    url: '/api/news', 
							    method: "GET"
							 });

		request.then(function(data){
			$scope.storedData = data;
		},function(err){
			console.log("DisplayDB error: "+err);
		})

	}

	$scope.deleteRow = function(newsid){

		$http.delete('api/news/' + newsid)
			.then(function(){
				console.log("Sucessfully deleted");
				$scope.displayDB();

			})
	}

	//Corro las funciones al cargar la paginas
	$scope.runRequest();
	$scope.displayDB();

})

