const { Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  passwordConfirm: {
    type: String,
  },
subscribers: [], 
subscriptions: [], 
playlists: [],
videos: [],
history: [],
notifications: []

});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

});


module.exports.comparePassword = function (password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}
UserSchema.methods.comparePassword = async function (inputPassword) {
  let User = this;
  return await bcrypt.compare(inputPassword, User.password);
};


 module.exports.User = model('User', UserSchema);

