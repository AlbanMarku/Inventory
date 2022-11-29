const mongoose = require('mongoose');

const UserSchema = mongoose.Schema;

const userSchema = new UserSchema({
  name: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
