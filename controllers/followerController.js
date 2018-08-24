const CustomFollowers = require('./../models/customFollower')

module.exports = {
	postFollower: function(req, res){
		let followers = new CustomFollowers({
			userId: req.body.userId,
			count: req.body.count
		})
		followers.save().then((counts) => {
			console.log('comments added',counts);
			return res.send(counts);
		})
		.catch(err => console.log(err));
	}
}