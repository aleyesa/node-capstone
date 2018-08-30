// import mongoose from 'mongoose';
import {
  Schema,
  newModel
} from '../../../mongoose/mongoose';

//User schema that looks for username, password, email
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String
});

userSchema.methods.listUserInfo = function() {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    email: this.email
  }
};

//creates a model of userSchema
const User = newModel('User', userSchema);

export default User;