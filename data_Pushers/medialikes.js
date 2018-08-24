var MediaLike = require('../models/medialike');

module.exports = {
	medialikesPush: function(req, res) {
			console.log("[%%post%%]=likes=",req.body);
			let element = req.body.msg;
            MediaLike.findOne({userId: element.id}).then((likes) => {
                    if (likes) {
                        console.log('already saved');
                        return Promise.resolve(likes);
                    }
                    var mediaLike = new MediaLike({
                        batchId: element.batchId,
                        userId: element.id,
                        mediaId: element.media_id,
                        userName:  element.username,
                        fullName:  element.full_name,
                        previewImage:  element.profile_picture,
                        instaId:  element.instaId,
                        status: 'active'
                    }); 
                    mediaLike.save().then((data) => {
                        console.log('SAVED',data);
                        return res.send(data)
                    }).catch(function (error) {
                        console.log(error);
                    });
                });
	}
}