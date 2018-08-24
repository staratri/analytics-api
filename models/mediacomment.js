const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mediaComment = new Schema({
    batchId: Number,
    mediaId: String,
    commentId: Number,
    userId: String, // userid who has created this post
    userName: String,
    fullName: String,
    profilePicture: {},
    comment: String,
    time: String,
    status: String
},
{
  timestamps: true
});

let MediaComment = mongoose.model('mediaComment', mediaComment);

module.exports = MediaComment;