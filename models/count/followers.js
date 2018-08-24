const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var countfollower = new Schema({
	userId : String,
    count: Number
    },
    {
    timestamps: true
    }
);

let countFollower = mongoose.model('countfollower', countfollower);

module.exports = countFollower;