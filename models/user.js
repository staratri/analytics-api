const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    batchId: Number,
    name : {
        type: String,
        trim: true,
    },
    email : {
        type: String,
        trim: true,
        required: true
    },
    password : {
        type: String,
        trim: true,
    },
    role : {
        type: String,
        enum: [
            "admin",
            "customer",
        ],
        default: "customer",
    },
    status : {
        type: Number,
        default: 1,
    },
},
{
  timestamps: true,
});

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth"
  return Promise.resolve(jwt.sign({_id : user._id.toHexString(), access}, 'abc123').toString());
};

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(user, [ "_id", "name", "email", "role"]);
}

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({
    status: 1,
    email
  }).then((user) => {
    if (!user) {
      return Promise.reject("Your E-mail is incorrect.");
    }
    if (bcrypt.compareSync(password, user.password)) {
      return user.generateAuthToken().then((token) => {
        return Promise.resolve({token, user});
      });
    }
    return Promise.reject("Your Password is incorrect.");
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decode;
  try {
      decode = jwt.verify(token, 'abc123');
  }catch (e) {
    return Promise.reject(e)
  }
  return User.findOne({
    "_id": decode._id,
  });
};

UserSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

let User = mongoose.model('user', UserSchema);

module.exports = User;