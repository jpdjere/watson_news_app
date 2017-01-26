//Importo mi Schema "news", desde Models
var News = require('./models');

var express = require('express');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// MIDDLEWARE to use for all requests 
//Send a console.log and go to next() route
router.use(function(req, res, next) {
    console.log("Route working OK!");
    next(); 
});

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// on routes that end in /bears
// ----------------------------------------------------
router.route('/news')
	

	//Create a news when the method passed is post (accessed at POST http://localhost:3000/api/news)
	.post(function(req, res){
		//Create new isntance of news model
		var news = new News();
		console.log();
		console.log("ESTO ES LO QUE VIENE DEL POST");
		console.log("");
		console.log(req.body);

		//Set the News properties (they come from the request)
		news.title = req.body.title;
		news.subtitle = req.body.subtitle;
		news.tone.anger = req.body.tone.anger;
		news.tone.disgust = req.body.tone.disgust;
		news.tone.fear = req.body.tone.fear;
		news.tone.joy = req.body.tone.joy;
		news.tone.sadness = req.body.tone.sadness;

		console.log("ESTO ES News");
		console.log("");
		console.log(news);

		//Save the data recieved
		news.save(function(err){
			if(err){
				res.send(err);
			}
		});

		//Give some success message
		res.json({message: 'News created successfully'});


	})

	//Get all the news when a method passed is GET (accessed at GET http://localhost:3000/api/news)
	.get(function(req,res){
		News.find(function(err,news){
			if(err){
				res.send(err)
			}

			res.json(news);
			console.log("All data retrieved");
		})
	})

// on routes that end in /news/:news_id
// ----------------------------------------------------
router.route('/news/:news_id')

    // get the News with that id (accessed at GET http://localhost:3000/api/news/:news_id)
    .get(function(req, res) {
    	News.findById(req.params.news_id,function(err,news){
    		if(err){
    			res.send(err)
    		}
    		res.json(news);
    	})
    })

    // update the News with this id (accessed at PUT http://localhost:8080/api/news/:news_id)
    .put(function(req,res){

    	//use our news model to find the news we want
    	News.findById(req.params.news_id,function(err,news){

    		if(err)
    			res.send(err)

			//Update the News properties (they come from the request)
			news.title = req.body.title;
			news.subtitle = req.body.subtitle;
			news.tone.anger = req.body.tone.anger;
			news.tone.disgust = req.body.tone.disgust;
			news.tone.fear = req.body.tone.fear;
			news.tone.joy = req.body.tone.joy;
			news.tone.sadness = req.body.tone.sadness;

			news.save(function(err){
				if(err)
					res.send(err);
				res.json({message: "News updated"})
			})
    	})
    })

    .delete(function(req,res){
    	News.remove({
    		_id: req.params.news_id
    	}, function(err,news){
    		if(err)
    			res.send(err)

    		res.json({message:'Successfully deleted'})
    	})
    })


module.exports = router;