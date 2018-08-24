var User = require('../models/account');

module.exports = {
    selfPush: function(req, res) {
            console.log("[%%post%%]=self=",req.body.msg);
            let body = req.body.msg;
            User.findOne({instaId: body.id}).then((userData) => {
                if(userData) {
                    // userData = new UserData({instaId: body.id});
                    console.log('already saved');
                    return Promise.resolve(userData);
                }
                user = new User({
                    batchId: body.batchId,
                    instaId:  body.id, 
                    username: body.username,
                    fullName: body.full_name,
                    profilePicture: body.profilePicture,
                    bio: body.bio,
                    isBusiness: body.isBusiness,
                    posts: body.counts.media,
                    follows: body.counts.follows,
                    followers: body.counts.followers,
                });
                user.save().then((data) => {
                    console.log('user info saved', data);
                    res.send(data);
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.log("{**}error",error);
            })
    }
}