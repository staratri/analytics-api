var Followers = require('../../models/follower');
var countFollowers = require('../../models/count/followers');

module.exports = {
	followersCheck: function(req, res) {
			console.log("[%%post%%]=follower Durability tests=",req.body);
            let body = req.body.msg;

            Fcount = new countFollowers({
                count : body.length
            });
            Fcount.save().then((numbers)=> {
                console.log('count saved', numbers);
                res.send(numbers);
            });
            
            Followers.update({}, {status : "inactive"},{multi: true},
            function(err, count) {
                if (err) console.log(err);
                if (count)console.log(count);
            });
            Followers.find({}).then((data) => {
                console.log('databse',data);
                body.forEach(item =>{
                    data.forEach(element =>{
                        if (item == element.userId) {
                            console.log('user id found', element.userId);
                            Followers.update({userId: item}, {status : "active"},
                            function(err, count) {
                                if (err) console.log(err);
                                if (count)console.log(count);
                            });
                        }
                    });  
                });
            }).catch(function (error) {
                console.log("{**}error",error);
            });
	}
}