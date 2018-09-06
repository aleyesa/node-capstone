import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
//emailregex.com
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//User schema that looks for username, password, email
const userSchema = new Schema({
  username: { 
    type: String,
    required: 'Username is required.',
    unique: true
  },
  password: { 
    type: String, 
    required: 'Password is required.', 
    trim: true 
  }
});

//email: { type: String, required: 'Email is mandatory.'
// , unique: true, trim: true,
//  validate: [ email => emailRegexPattern.test(email),
//    'Please enter a valid email address.' ] },

userSchema.methods.comparePw = function(pw, pwHash) {
  return bcrypt.compare(pw, pwHash);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

//creates a model of userSchema
const User = mongoose.model('User', userSchema);

userSchema.post('save', (err, user, next) => {
  console.log(err);
  next();
});

export default User;