const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let custom = new Schema({
	mediaId : {
		type: String,
		required: true
	},
	userId : {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	}
}) 
let CustomComments = mongoose.model('customComments', custom);
module.exports = CustomComments;