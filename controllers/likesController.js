var CustomLikes = require('../models/customLikes');

module.exports = {
	addlike: (req, res) => {
		let likes = new CustomLikes({
			mediaId: req.body.mediaId,
			userId: req.body.userId,
			count: req.body.count
		})
		likes.save().then((counts) => {
			console.log('likes added',counts);
			return res.send(counts);
		})
		.catch(err => console.log(err));
	}
}