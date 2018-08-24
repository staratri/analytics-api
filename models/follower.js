const mongoose = require("mongoose");
const _ = require('lodash');
var Schema = mongoose.Schema;

var follower = new Schema({
    batchId: Number,
    userId: String, // userid who has created this post
    userName: String,
    full_name: String,
    instaId: String,
    profile_picture: {},
    status : String
});

let Follower = mongoose.model('follower', follower);

module.exports = Follower;