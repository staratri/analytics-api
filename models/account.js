const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    instaId:  String, // user id got from instagram
    // userId:String, //application user id for mapping
    username: String,
    fullName: String,
    profilePicture: String,
    bio:String,
    isBusiness:Boolean,
    posts: {
        type: Number,
        default: 0
    },
    follows: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    accessToken: {
        type: String,
    },
},
{
  timestamps: true
});

let Account = mongoose.model('Accounts', accountSchema);

module.exports = Account;