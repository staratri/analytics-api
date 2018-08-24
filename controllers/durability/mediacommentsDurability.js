var Mediacomments = require('../../models/mediacomment');
var countMediacomments = require('../../models/count/mediaComments');


module.exports = {
	mediacommentsCheck: function(req, res) {
			console.log("[%%post%%]=comments durability tests=",req.body);
            let body = req.body.msg;

            if(body.length != 0){
                Fcount = new countMediacomments({
                    count : body.length,
                    mediaId : body[0].mediaId
                });
                Fcount.save().then((numbers)=> {
                    console.log('count saved', numbers);
                    res.send(numbers);
                });
                if (body.constructor === Array) {
                    body.forEach(comments => {
                        updation(comments);
                    })
                }else{
                    updation(body);
                }
            }
	}
}

function updation(body){
    var x = 1;
    Mediacomments.find({}).then((fetched) => {
        // body.forEach(item =>{
            fetched.forEach(element =>{
                if (body.id == element.commentId) {
                    console.log('comment user id found', element.commentId);
                    x= 0;
                }
            });
            if (x == 1) {
                console.log('===not found====')
                Mediacomments.update({commentId: body.id}, {status : "inactive"},{multi: true},
                function(err, count) {
                    if (err) console.log(err);
                    if (count)console.log(count);
                });
            }
        // });
    }).catch(function (error) {
        console.log("{**}error",error);
    });
}