const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var mediaLike = new Schema({
    batchId: Number,
    userId: String, // userid who has created this post
    userName: String,
    fullName: String,
    mediaId: String,
    instaId: String,
    previewImage: {},
    status: String
},
{
  timestamps: true
});

let MediaLike = mongoose.model('mediaLike', mediaLike);

module.exports = MediaLike;