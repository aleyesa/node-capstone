const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User schema that looks for username, password, email
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String
});

userSchema.methods.listUserInfo = () => {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    email: this.email
  }
};

//creates a model of userSchema
const User = mongoose.model('User', userSchema);



module.exports = { User };