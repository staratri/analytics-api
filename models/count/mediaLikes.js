const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countlikes = new Schema({
	likeId : String,
    count: Number
    },
    {
    timestamps: true
    }
);

let countLikes = mongoose.model('countlikes', countlikes);

module.exports = countLikes;