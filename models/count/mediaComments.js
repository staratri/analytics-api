const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countmediaComments = new Schema({
	mediaId : String,
    count: {
        type: Number,
        default: 0
    }
    },
    {
    timestamps: true
    }
);

let countMediacomments = mongoose.model('countmediaComments', countmediaComments);

module.exports = countMediacomments;