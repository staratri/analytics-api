const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var followsSchema = new Schema({
    batchId: Number,
    userId: String, // userid who has created this post
    userName: String,
    fullName: String,
    instaId: String,
    profilePicture: {},
    status: String
},
{
  timestamps: true
});

let Follow = mongoose.model('follow', followsSchema);

module.exports = Follow;