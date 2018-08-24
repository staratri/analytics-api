const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var postsSchema = new Schema({
    batchId: Number,
    mediaId:  String,  //media id got from istagram
    instaId: String, // userid who has created this post
    previweImage: {},
    createdTime: Number,
    captionText: String,
    userHasLiked: Boolean,
    likes: Number,
    tags: [String],
    filter: String,
    commentsCount: Number,
    type: String,
    link: String,
    location: {},
    usersInPhotos: [],
    carouselMedia: []
},
{
  timestamps: true
});

let Media = mongoose.model('media', postsSchema);

module.exports = Media;