var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var util = require('util');
var fs = require('fs');
var app = express();

var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '67b5de56-a424-466c-bd3b-efd8ef090390',
  password: 'IbCXdTfcYiBs',
  version: 'v3',
  version_date: '2016-05-19'
});

// var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

// var text_to_speech = new TextToSpeechV1 ({
//   username: '48f17f94-e483-42cf-90f8-e01e53ddfdbf',
//   password: 'dBYSVyH06tPY'
// });

var alchemy_language = watson.alchemy_language({
  api_key: '4c71c9de0dd6d2f26cee8af5f66e79f426515401'
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


router.get('/nyt', function(req,res){
	// NYT Get articles API
	request.get({
	  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	  qs: {
	    'api-key': "aae6d357d15b419cb6955e00236d58df",
	    'q': req.query.city,
	    'sort': "newest",
	    'fl': "headline,lead_paragraph,pub_date",
	    'page': 0
	  },
	}, function(err, response, body) {

	  	news = JSON.parse(body);
	  	var tone_analysis;
	  	var alchemy_analysis;

	  	var lead_paragraph = news.response.docs[0].lead_paragraph;
/*	  	TEXT-TO-SPEECH SYNTETHIZER

		var params = {
		  text: news.response.docs[0].headline.main,
		  voice: 'en-US_AllisonVoice',
		  accept: 'audio/wav'
		};

		fileTitle =  news.response.docs[0].headline.main.toLowerCase();
		fileTitle =  fileTitle.replaceAll(" ","_");
		text_to_speech.synthesize(params).pipe(fs.createWriteStream('public/'+fileTitle+'.wav'));

*/

		var alchemy_params = {
		  extract: 'entities,taxonomy',
		  sentiment: 1,
		  maxRetrieve: 5,
		  text: lead_paragraph
		};
		
		alchemy_language.combined(alchemy_params, function (err, response) {
		  if (err)
		    console.log('AlchemyLanguage error:', err);
		  else
		    alchemy_analysis = response;
		});

		tone_analyzer.tone({ text: lead_paragraph },
		  function(err, tone) {
		    if (err){
		      console.log(err);
		    }
		    else{
		    	// console.log(tone);
		      tone_analysis = tone;
		      // res.json({ a: news, b:analysis });
		      res.json({news:news, ana:tone_analysis, alchemy:alchemy_analysis});
		  	}
		});

		
	  	
	})


});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports = router;