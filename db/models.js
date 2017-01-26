var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Set the data types, properties and default values to our Schema.
var NewsSchema = new Schema({
	title: 	{type: String, default: ''},
	subtitle: {type: String, default: ''},
	tone:{
		anger: {type: Number},
		disgust: {type: Number},
		fear: {type: Number},
		joy: {type: Number},
		sadness: {type: Number}
	}
})


module.exports = mongoose.model('News',NewsSchema);