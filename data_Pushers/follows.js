var Follow = require('../models/follows');

module.exports = {
	followsPush: function(req, res) {
			console.log("[%%post%%]=follows=",req.body.msg);
			let element = req.body.msg;
            Follow.findOne({userId: element.id}).then((data) => {
                if (data) {
                    console.log('already added')
                    return Promise.resolve(data);
                }
                follow = new Follow({
                    batchId: element.batchId,
                    userId: element.id,
                    instaId: element.instaId,
                    userName: element.username,
                    fullName: element.full_name,
                    profilePicture: element.profile_picture,
                    status: 'active'
                });

                follow.save().then((body) => {
                    console.log('follows saved',body);
                    res.send(body)
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.log("{**}error",error);
            });
	}
}