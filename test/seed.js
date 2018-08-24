const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

var  userOne_id = new ObjectId();
var  userTwo_id = new ObjectId();
const user = [{
  _id: userOne_id,
  email: "utkarsh@test.com",
  password: "123123",
  tokens: [{
    access: "auth",
    token: jwt.sign({_id:userOne_id, access: "auth"}, "abc123").toString()
  }],
},{
  _id: userTwo_id,
  email: "utkarshpandey@test.com",
  password: "123123",
}];

const populateUser = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(user[0]).save();
    var userTwo = new User(user[1]).save();
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}
 module.exports = {user, populateUser};