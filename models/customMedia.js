const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let custom = new Schema({
	mediaId : {
		type : String,
		required : true
	},
	userId : {
		type: String,
		required: true
	},
	likesCount: {
		type: Number,
		required: true
	},
	commentsCount: {
		type: Number,
		required: true
	}
}) 
let CustomMedia = mongoose.model('customMedia', custom);
module.exports = CustomMedia;