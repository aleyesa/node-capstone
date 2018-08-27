const mongoose = require('mongoose');
const TEST_DATABASE = require('../../resources/config');
const { User } = require('./userModels');

mongoose.connect(TEST_DATABASE, (err) => {
  console.log(err);
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  // we're connected!
  console.log('Testing database connected.');
});

const getAllUsers = (req, res) => {
  //need check for required keys first
  User.find()
  .then(user => {
    res.json({users: user.map(accountInfo => {
      return {
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        username: accountInfo.username,
        email: accountInfo.email
      }
    })})
  })
  .catch(err => console.error(err));
};

const getUserById = (req, res) => {

};

const createUser = (req, res) => {
  return User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
