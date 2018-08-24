var Media = require('../models/media');

var mediaPush = (req, res) =>{
	console.log("[%%post%%]=media=",req.body.msg.id);
			let element = req.body.msg;
		    Media.findOne({"mediaId": element.id}).then((data) => {
                if (data) {
                	console.log('already saved')
                    return Promise.resolve(data);
                }
                console.log(element)
                var media = new Media({
                    batchId: element.batchId,
                    mediaId:  element.id,
                    instaId: element.instaId,
                    previweImage: element.images,
                    createdTime: element.created_time,
                    captionText: element.text,
                    userHasLiked: element.user_has_liked,
                    likes: element.likes.count,
                    tags: element.tags,
                    filter: element.filter,
                    commentsCount: element.comments.count,
                    type: element.type,
                    link: element.link,
                    location: element.location,
                    usersInPhotos: element.users_in_photos,
                    carouselMedia: element.carousel_media
                });
                console.log('saved', media);
                media.save().then((body) => {
                	console.log('saved[=]', body);
                    res.send(body)
                }).catch(function (error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.log("{**}error",error);
            })
}

const getAllMedia = async (req, res) =>{
	let medias = await Media.find()
	return medias
}

module.exports = {mediaPush, getAllMedia}