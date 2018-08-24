var MediaComment = require('../models/mediacomment');

module.exports = {
	mediacommentsPush: function(req, res) {
			console.log("[%%post%%]=comment=",req.body);
			let element = req.body.msg;
            MediaComment.findOne({commentId: element.id}).then((mediaComment) => {
                if (mediaComment) {
                    return console.log('already saved');
                }
                var mediaComment = new MediaComment({
                    batchId: element.batchId,
                    mediaId :  element.media_id,
                    commentId:  element.id,
                    userName:  element.from.username,
                    comment : element.text,
                    time : element.created_time,
                    status: 'active'
                });
                mediaComment.save().then((body) => {
                    console.log('media comment saved', body);
                    res.send(body)
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function(err){
                console.log('comment error',err);
            });
	}
}