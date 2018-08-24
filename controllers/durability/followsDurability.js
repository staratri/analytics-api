var Follows = require('../../models/follows');
var countFollows = require('../../models/count/follows');


module.exports = {
	followsCheck: function(req, res) {
			console.log("[%%post%%]=follows Durability tests=",req.body);
            let body = req.body.msg;

            Fcount = new countFollows({
                count : body.length
            });
            Fcount.save().then((numbers)=> {
                console.log('count saved', numbers);
                res.send(numbers);
            });

            Follows.update({}, {status : "inactive"},{multi: true},
            function(err, count) {
                if (err) console.log(err);
                if (count)console.log(count);
            });
            Follows.find({}).then((data) => {
                console.log('databse',data);

                body.forEach(item =>{
                    data.forEach(element =>{
                        if (item == element.userId) {
                            console.log('user id found', element.userId);
                            Follows.update({userId: item}, {status : "active"},
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