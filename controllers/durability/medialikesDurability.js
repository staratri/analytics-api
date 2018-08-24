var Medialikes = require('../../models/medialike');
var countMedialikes = require('../../models/count/mediaLikes');


module.exports = {
	medialikesCheck: function(req, res) {
			console.log("[%%post%%]=likes durability tests=",req.body);
            let body = req.body.msg;

            Fcount = new countMedialikes({
                count : body.length
            });
            Fcount.save().then((numbers)=> {
                console.log('count saved', numbers);
                res.send(numbers);
            });
            
            Medialikes.update({}, {status : "inactive"},{multi: true},
            function(err, count) {
                if (err) console.log(err);
                if (count)console.log(count);
            });
            Medialikes.find({}).then((data) => {
                console.log('databse',data);
                body.forEach(item =>{
                    data.forEach(element =>{
                        if (item == element.userId) {
                            console.log('liked user id found', element.userId);
                            Medialikes.update({userId: item}, {status : "active"},
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