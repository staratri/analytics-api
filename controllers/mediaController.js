var CustomMedia = require('../models/customMedia');

module.exports = {
	addMedia: (req, res) => {
		let Media = new CustomLikes({
			mediaId: req.body.mediaId,
			userId: req.body.userId,
			count: req.body.count
		})
		Media.save().then((data) => {
			console.log('media added',data);
			return res.send(data);
		})
		.catch(err => console.log(err));
	}
}