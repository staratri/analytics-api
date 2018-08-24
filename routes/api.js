const express = require('express');
const cors = require('cors')

let multer = require('multer');
let upload = multer();
var router = express.Router();
router.use(cors());
const request = require('request');

var User = require('../models/user');
var Account = require('../models/account');
var Follower = require('../models/follower');
var Follow = require('../models/follows');
var Media = require('../models/media');
var MediaComment = require('../models/mediacomment');
var MediaLike = require('../models/medialike');


let logger = require("../core/logger");
let Response = require("../services/response");
const Mailer = require('../services/mailer');
const _ = require('lodash');


//custom api's
const followerController = require('./../controllers/followerController');
const commentController = require('./../controllers/commentController');
const likesController = require('./../controllers/likesController');
const mediaController = require('./../controllers/mediaController');
const followersDurability = require('./../controllers/durability/followersDurability');
const followsDurability = require('./../controllers/durability/followsDurability');
const medialikesDurability = require('./../controllers/durability/medialikesDurability');
const mediacommentsDurability = require('./../controllers/durability/mediacommentsDurability');

//data pushers
const mediaPusher = require('./../data_Pushers/media');
const medialikesPusher = require('./../data_Pushers/medialikes');
const mediacommentsPusher = require('./../data_Pushers/mediacomments');
const selfPusher = require('./../data_Pushers/self');
const followersPusher = require('./../data_Pushers/followers');
const followsPusher = require('./../data_Pushers/follows');



router.get('/', function (req, res, next) {
	return Response.success(res, {
		version: '0.1',
	});
});


router.get('/subscribe', upload.fields([]), function (req, res, next) {
	var body = req.query;
	var user = new User({
		fname: body.fname,
		lname: body.lname,
		email: body.email,
	});
	user.save().then(() => {
		return user;
	}).then((user) => {
		// Sending mail to subscriber
		Mailer.subscribe(user.email);
		return res.header("Access-Control-Allow-Origin", "*").send(body.c+'({result: "success", msg: "sucess"})');
	}).catch((err) => {
		console.log(err);
		return res.header("Access-Control-Allow-Origin", "*").status(400).send(body.c+'({result: "fail", msg: "fail"})');
	});
});


router.post('/users/create', function (req, res, next) {
	console.log(req.body);
	var body = _.pick(req.body, ["name", "email", "password"]);
	User.findOne({email: body.email})
	.then((user) => {
		if (!user) {
			var user = new User({email: body.email});
		}
		user.name = body.name;
		user.password = body.password;
		return user.save();
	})
	.then((user) => {
		console.log('saved user', user);
		return user.generateAuthToken();
	}).then((token) => {
		return res.header("Access-Control-Allow-Origin", "*").header('x-auth', token).send();
	}).catch((err) => {
		console.log(err);
		return res.header("Access-Control-Allow-Origin", "*").status(400).send(err);
	});
});


router.post('/login', function (req, res, next) {
	var body = _.pick(req.body, ["password", "email"]);
	if(!(body.email && body.password)) {
		return res.header("Access-Control-Allow-Origin", "*").status(400).send({status: 0, error: 'Email and password is required'});
	}
	/*
	* Validate email and password field
	*/
	if (body.email.length < 3 || body.password.length < 5) {
		return res.header("Access-Control-Allow-Origin", "*").status(400).send();
	}

	console.log(body);
	User.findByCredentials(body.email, body.password).then((result) => {
		console.log("result", result)
		return res.header("Access-Control-Allow-Origin", "*").header('Access-Control-Expose-Headers', '*').header('x-auth', result.token).cookie('x-auth', result.token).send({status: 1, data: {
			user: result.user,
			token: result.token
		}});
	}).catch((err) => {
		console.log(err);
		return res.header("Access-Control-Allow-Origin", "*").status(400).send(err);
	});
});

//saves data from api request made by data-engine
router.post('/data/self', selfPusher.selfPush);
router.post('/data/media', mediaPusher.mediaPush);
router.post('/data/media/likes', medialikesPusher.medialikesPush);
router.post('/data/media/comments', mediacommentsPusher.mediacommentsPush);
router.post('/data/followers', followersPusher.followersPush);
router.post('/data/follows', followsPusher.followsPush);

router.get('/data/media/getAllMedia', async (req, res)=>{
	let response = await mediaPusher.getAllMedia()
	if(response){
		res.send(response)
	}
	else{
		res.send("something went wrong")
	}
})

// durability testing api's for making active and inactive
router.post('/data/followers/durability',followersDurability.followersCheck);
router.post('/data/follows/durability',followsDurability.followsCheck);
router.post('/data/media_likes/durability',medialikesDurability.medialikesCheck);
router.post('/data/media_comments/durability',mediacommentsDurability.mediacommentsCheck);

/**
	* @api {post} /media/likes/count Adds custom likes count to media
	* @apiVersion 0.0.1
	* @apiName Adds custom likes
	* @apiGroup likes
	*
	* @apiParam {String} mediaId custom media id.
	* @apiParam {String} userId custom user id.
	* @apiParam {Number} count custom likes count.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		{
	*			mediaId : "a23k8fhd8u4jkfd",
	*			userId : 3873465223,
	*			count: 21
	*		}
	* @apiError ParamsNotFound Some fields not provided.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 400 Not Found
	*     {
	*       "error": "some params missing"
	*     }
*/
router.post('/media/likes/count', likesController.addlike);

/**
	* @api {post} /media/comments/count Adds custom comments count to media
	* @apiVersion 0.0.1
	* @apiName Adds custom comments
	* @apiGroup comments
	*
	* @apiParam {String} mediaId custom media id.
	* @apiParam {String} userId custom user id.
	* @apiParam {Number} count custom number of comments.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		{
	*			mediaId : "a23k8fhd8u4jkfd",
	*			userId : 3873465223,
	*			count: 21
	*		}
	* @apiError ParamsNotFound Some fields not provided.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 400 Not Found
	*     {
	*       "error": "some params missing"
	*     }
*/
router.post('/media/comments/count', commentController.addComment);

/**
	* @api {post} /media/followers/count Adds custom followers count
	* @apiVersion 0.0.1
	* @apiName Adds custom followers
	* @apiGroup followers
	*
	* @apiParam {String} userId custom user id.
	* @apiParam {Number} mediaId custom media id.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		{
	*			userId : 3873465223,
	*			count: 21
	*		}
	* @apiError ParamsNotFound Some fields not provided.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 400 Not Found
	*     {
	*       "error": "some params missing"
	*     }
*/
router.post('/user/followers/count', followerController.postFollower);

/**
	* @api {post} /media/media/count Adds custom media count to media
	* @apiVersion 0.0.1
	* @apiName Adds custom media
	* @apiGroup posts
	*
	* @apiParam {String} mediaId custom media id.
	* @apiParam {String} userId custom user id.
	* @apiParam {Number} likesCount custom number of likes.
	* @apiParam {Number} commentsCount custom number of comments.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		{
	*			mediaId : "245rr43rhh5f336hyhb33",
	*			userId : "234422112344",
	*			likesCount:101,
	*			commentsCount: 35	
	*		}
	* @apiError ParamsNotFound Some fields not provided.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 400 Not Found
	*     {
	*       "error": "some params missing"
	*     }
*/
router.post('/user/media/count', mediaController.addMedia);

router.use((req, res, next) => {
	console.log(req.body.auth_token)
	var token = req.body.auth_token;
	User.findByToken(token).then((user) => {
		if (!user) {
			return Promise.reject();
		}
		req.user = user;
		next();
	}).catch((err) => {
		return res.header("Access-Control-Allow-Origin", "*").status(400).send(err);
	});
});

/**
	* @api {post} /accounts/insta Adds Insta account
	* @apiVersion 0.0.1
	* @apiName Adds Accounts
	* @apiGroup Accounts
	*
	* @apiParam {String} authtoken Authentication token.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		{
	*			instaId: "1243jkh234df",
	*			username: "Iron_man",
	*			profilePicture: "https://ironmark32.jpg",
	*			name: "Iron Man",
	*			bio: "Save the world",
	*			isBusiness: false,
	*			userId: "12333132",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72"
	*		}
	* @apiError UserNotFound The id of the User was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 400 Not Found
	*     {
	*       "error": "User Denied from Authentication"
	*     }
*/

router.post('/accounts/insta', async (req, res) => {
	console.log(req.user);
	//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	request.post('https://api.instagram.com/oauth/access_token', {form: {
		client_id: 'c5bc364c349340e7bfb430dd6ce571be',
		client_secret: 'cb1c6b79b39f4cc09874b6fa97277fb3',
		grant_type: 'authorization_code',
		redirect_uri: 'http://localhost:8080/accounts',
		// redirect_uri: 'http://dev.analytiks.io/accounts',
		code: req.body.code
	}}, (err, response, body) => {
		if(err) {
			console.log("Auth token exchange failed");
			return res.header("Access-Control-Allow-Origin", "*").status(400).send(err);
			return;
		}
		body = JSON.parse(body);
		console.log('body---', body);
		if(body.access_token) {
			console.log(body);
			let account = new Account({
				instaId: body.user.id,
				username: body.user.username,
				profilePicture: body.user.profile_picture,
				name: body.user.full_name,
				bio: body.user.bio,
				isBusiness: body.user.is_business,
				userId: req.user._id,
				accessToken: body.access_token
			});
			account.save().then(account => {
				//Todo: Save access token in db with new account upsert
				console.log(`Token for ${body.user.username} is  ${body.access_token}`);
				return res.header("Access-Control-Allow-Origin", "*").send({status: 1, data: account});
			}).catch(err => {
				console.log(err);
				return res.header("Access-Control-Allow-Origin", "*").status(400).send({status: 0, error: err});
			});
		}else {
			return res.header("Access-Control-Allow-Origin", "*").status(400).send(body);
		}
	})
	// .then(response => { console.log(response.data) })
	// .catch(err => console.log(err));
	// res.send();
});


/**
	* @api {post} /accounts Gets added account
	* @apiVersion 0.0.1
	* @apiName GetAccounts
	* @apiGroup Accounts
	*
	* @apiParam {String} authtoken Authentication token.
	* @apiParam {String} code Selected account.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		[{
	*			instaId: "1243jkh234df",
	*			username: "Iron_man",
	*			profilePicture: "https://ironmark32.jpg",
	*			name: "Iron Man",
	*			bio: "Save the world",
	*			isBusiness: false,
	*			userId: "12333132",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72"
	*		}
	*		{
	*			instaId: "2397hyuew7yq",
	*			username: "thor_2121",
	*			profilePicture: "https://somthingBat.jpg",
	*			name: "King Thor",
	*			bio: "power of thunder",
	*			isBusiness: true,
	*			userId: "23985637",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rkjshdgfis87asd72"
	*		}]
	* @apiError UserNotFound The id of the User was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error": "No accounts added"
	*     }
*/
router.post('/accounts', function(req, res){
	console.log(req.body);
	Account.find({})
	.then((accounts) => {
		console.log(accounts);
		return res.header("Access-Control-Allow-Origin", "*").send(accounts);
	})
	.catch((err) => {console.log(err)})
});

/**
	* @api {post} /followers fetches followers list of selected user
	* @apiVersion 0.0.1
	* @apiName followers
	* @apiGroup followers
	*
	*
	* @apiParam {String} authtoken Authentication token.
	* @apiParam {String} instaId instagram user id.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		[{
	*			instaId: "1243jkh234df",
	*			username: "Big_hulk",
	*			profilePicture: "https://hulksmash.jpg",
	*			name: "Dr Banner",
	*			userId: "12333132",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72"
	*		}
	*		{
	*			instaId: "1243jkh234df",
	*			username: "thor_2121",
	*			profilePicture: "https://somthingBat.jpg",
	*			name: "King Thor",
	*			userId: "23985637",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rkjshdgfis87asd72"
	*		}]
	* @apiError UserNotFound The id of the User was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error": "user Id not found"
	*     }
*/
router.post('/followers', function(req, res){
	console.log(req.body.instaId);
	Follower.find({instaId: req.body.instaId})
	.then((data) => {
		return res.header("Access-Control-Allow-Origin", "*").send(data);
	})
	.catch((err) => {console.log(err)})
});

/**
	* @api {post} /follows fetches follows list of selected user
	* @apiVersion 0.0.1
	* @apiName follows
	* @apiGroup follows
	*
	*
	* @apiParam {String} authtoken Authentication token.
	* @apiParam {String} instaId instagram user id.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		[{
	*			instaId: "1243jkh234df",
	*			username: "Big_hulk",
	*			profilePicture: "https://hulksmash.jpg",
	*			name: "Dr Banner",
	*			userId: "12333132",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rwuhfidfsnjasd72"
	*		}
	*		{
	*			instaId: "1243jkh234df",
	*			username: "thor_2121",
	*			profilePicture: "https://somthingBat.jpg",
	*			name: "King Thor",
	*			userId: "23985637",
	*			accessToken: "afeirl23jurnwfeds98uhi2398rkjshdgfis87asd72"
	*		}]
	* @apiError UserNotFound The id of the User was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error": "user Id not found"
	*     }
*/
router.post('/follows', function(req, res){
	console.log(req.body.instaId);
	Follow.find({instaId: req.body.instaId})
	.then((data) => {
		console.log(data);
		return res.header("Access-Control-Allow-Origin", "*").send(data);
	})
	.catch((err) => {console.log(err)})
});

/**
	* @api {post} /posts fetches posts of selected user
	* @apiVersion 0.0.1
	* @apiName posts
	* @apiGroup posts
	*
	*
	* @apiParam {String} authtoken Authentication token.
	* @apiParam {String} instaId instagram user id.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		[{
	*			createdAt : "2018-02-15T06:25:23.446Z",
	*			carouselMedia : Array(0),
	*			commentsCount : 0,
	*			createdTime : 1496766593,
	*			filter : "Hudson",
	*			instaId : "353672812175",
	*			likes : 38,
	*			link : "https://www.instagram.com/p/BVAT9DTYNBJM9B-x7/",
	*			location : Object,
	*			mediaId : "1531311632322433915451_3536728175",
	*			previweImage : Object,
	*			tags : Array(5),
	*			type : "image",
	*			updatedAt : "2018-02-15T06:25:23.446Z",
	*			userHasLiked : false,
	*			usersInPhotos : Array(0),
	*			__v : 0,
	*			_id : "5a852r37d35091a30dc4cce307"
	*		}
	*		{
	*			createdAt : "2018-02-15T06:25:23.446Z",
	*			carouselMedia : Array(0),
	*			commentsCount : 0,
	*			createdTime : 1496766593,
	*			filter : "Hudson",
	*			instaId : "35367281275",
	*			likes : 38,
	*			link : "https://www.instagram.com/p/BVUIYGUAT9D9B-x7/",
	*			location : Object,
	*			mediaId : "1531311223632322915451_3536728175",
	*			previweImage : Object,
	*			tags : Array(5),
	*			type : "image",
	*			updatedAt : "2018-02-15T06:25:23.446Z",
	*			userHasLiked : false,
	*			usersInPhotos : Array(0),
	*			__v : 0,
	*			_id : "5a8527d35093e1a30dc4cce307"
	*		}]
	* @apiError UserNotFound The id of the User was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error": "user Id not found"
	*     }
*/
router.post('/posts',function(req, res){
	console.log(req.body.instaId);
	Media.find({instaId: req.body.instaId})
	.then(data => {
		console.log(data);
		return res.header("Access-Control-Allow-Origin", "*").send(data);
	})
});


/**
	* @api {post} /comments fetches comments on posts of selected user
	* @apiVersion 0.0.1
	* @apiName comments
	* @apiGroup comments
	*
	*
	* @apiParam {String} authtoken Authentication token.
	* @apiParam {String} mediaId selected media id.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		[{
	*			comment : "Avengers attack",
	*			commentId : 1787953423947018748,
	*			createdAt : "15/02/2018 11:55:25",
	*			fullName : "tony stark",
	*			image : "<div style="max-width: 25%;"><img src="https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5B00Dfr4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg" class="img-thumbnail"></div>",
	*			mediaId : "149781320536323708_3536728175",
	*			profilePicture : "https://scontent.cdninstagram.com/vp/74a2d0c77c31bt12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg",
	*			time : "1493130809",
	*			updatedAt : "2018-02-15T06:25:25.041Z",
	*			userId : "32367128175"
	*			userName : "iron_man",
	*			__v :0,
	*			_id : "5a8527d55iuhf730dc4cce326"
	*		}
	*		{
	*			comment : "now its time to defend",
	*			commentId : 178795234347018748,
	*			createdAt : "15/02/2018 11:55:25",
	*			fullName : "Steve Rogers",
	*			image : "<div style="max-width: 25%;"><img src="https://scontent.cdninstagram.com/vp/986rc77c31bba12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg" class="img-thumbnail"></div>",
	*			mediaId : "14978132051555423708_3536728175",
	*			profilePicture : "https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5TY4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg",
	*			time : "1493130809",
	*			updatedAt : "2018-02-15T06:25:25.041Z",
	*			userId : "3598728175"
	*			userName : "cation_america",
	*			__v :0,
	*			_id : "5a8527238991a30dc4cce326"
	*		}]
	* @apiError UserNotFound The id of the media was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error": "media Id not found"
	*     }
*/
router.post('/comments',function(req, res){
	console.log(req.body.mediaId);
	MediaComment.find({mediaId: req.body.mediaId})
	.then(data => {
		console.log(data);
		return res.header("Access-Control-Allow-Origin", "*").send(data);
	})
});

/**
	* @api {post} /likes fetches likes on posts of selected user
	* @apiVersion 0.0.1
	* @apiName likes
	* @apiGroup likes
	*
	*
	* @apiParam {String} authtoken Authentication token.
	* @apiParam {String} mediaId selected media id.
	*
	* @apiSuccessExample Success-Response:
	*     HTTP/1.1 200 OK
	*		[{
	*			createdAt : "15/02/2018 11:55:25",
	*			fullName : "tony stark",
	*			image : "<div style="max-width: 25%;"><img src="https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5B00Dfr4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg" class="img-thumbnail"></div>",
	*			mediaId : "149781320536323708_3536728175",
	*			previewImage : "https://scontent.cdninstagram.com/vp/74a2d0c77c31bt12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg",
	*			updatedAt : "2018-02-15T06:25:25.041Z",
	*			userId : "32367128175"
	*			userName : "iron_man",
	*			__v :0,
	*			_id : "5a8527d55iuhf730dc4cce326"
	*		}
	*		{
	*			createdAt : "15/02/2018 11:55:25",
	*			fullName : "Bruce Banner",
	*			image : "<div style="max-width: 25%;"><img src="https://scontent.cdninstagram.com/vp/74a2d0c77c31bba12d491e919e468859/5B00Dfr4B24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg" class="img-thumbnail"></div>",
	*			mediaId : "149781320536323708_3536728175",
	*			previewImage : "https://scontent.cdninstagram.com/vp/74a2d0c77c31bt12d491e919e468859/5B00DB24/t51.2885-19/s150x150/21985136_1727999440828497_48769611344117760_n.jpg",
	*			updatedAt : "2018-02-15T06:25:25.041Z",
	*			userId : "32367128175"
	*			userName : "hulk_green",
	*			__v :0,
	*			_id : "5a8527d55iuhf730dc4cce326"
	*		}]
	* @apiError UserNotFound The id of the media was not found.
	*
	* @apiErrorExample Error-Response:
	*     HTTP/1.1 404 Not Found
	*     {
	*       "error": "media Id not found"
	*     }
*/
router.post('/likes',function(req, res){
	console.log(req.body.mediaId);
	MediaLike.find({mediaId: req.body.mediaId})
	.then(data => {
		console.log(data);
		return res.send(data);
	})
});

router.post('/graph/dummy',function(req,res){
	console.log(req.body);
	var data ={
		  cols: [
		        {lable: 'Date', type:'date'},
		        {lable: 'instagram data', type: 'number'}
		      ],
		  rows: [{
		  			c: [{v: 'Date(2014, 2, 16)'}, {v: 2}
		        ]},
		        {
		  			c: [{v: 'Date(2014, 2, 17)'}, {v: 4}
		        ]},
		        {
		  			c: [{v: 'Date(2014, 2, 18)'}, {v: 8}
		        ]},
		        {
		  			c: [{v: 'Date(2014, 2, 19)'}, {v: 4}
		        ]},
		        {
		  			c: [{v: 'Date(2014, 2, 20)'}, {v: 12}
		        ]},
		        {
		  			c: [{v: 'Date(2014, 2, 21)'}, {v: 9}
		        ]},
		      ]
		}
	res.send(data);
});

router.post('/headers/dummy',function(req,res){
	console.log(req.body);
	var data = {
		first: 12,
		second: 10,
		third : 20,
		percent: 21
	}	
	res.send(data);
});



module.exports = router;