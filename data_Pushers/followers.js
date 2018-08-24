var Followers = require('../models/follower');

module.exports = {
	followersPush: function(req, res) {
			console.log("[%%post%%]=followers=",req.body.msg);
			let element = req.body.msg;
             Followers.findOne({userId: element.id}).then((data) => {
                if (data) {
                    console.log('already saved');
                    return Promise.resolve(data);
                }
                followers = new Followers({
                    batchId: element.batchId,
                    userId: element.id,
                    userName: element.username,
                    fullName: element.full_name,
                    profilePicture: element.profile_picture,
                    instaId : element.instaId,
                    status: "active"
                });

                followers.save().then((body) => {
                    console.log('followers saved',body);
                    res.send(body)
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.log("{**}error",error);
            });
	}
}