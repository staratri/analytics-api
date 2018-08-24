const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let custom = new Schema({
	userId : {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	}
}) 
let CustomFollowers = mongoose.model('customFollowers', custom);
module.exports = CustomFollowers;