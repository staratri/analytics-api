const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countfollows = new Schema({
	userId : String,
    count: Number
    },
    {
    timestamps: true
    }
);

let countFollows = mongoose.model('countfollows', countfollows);

module.exports = countFollows;