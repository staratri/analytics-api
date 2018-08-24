var CustomComments = require('../models/customComments');

module.exports = {
	addComment: function(req, res) {
		let comments = new CustomComments({
			mediaId: req.body.mediaId,
			userId: req.body.userId,
			count: req.body.count
		})
		comments.save().then((counts) => {
			console.log('comments added',counts);
			return res.send(counts);
		})
		.catch(err => console.log(err));
	}
}