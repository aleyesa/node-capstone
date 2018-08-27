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
        _id: accountInfo._id,
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        username: accountInfo.username,
        email: accountInfo.email
      }
    })})
  })
  .catch(err => console.log(err));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
  .then(user => res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
  }))
};

const createUser = (req, res) => {
  //check if required fields are listed
  //const requiredFields = ['firstName', 'lastName', 'username', 'password', 'email'];
  // for(let keys in req.body){
  //   requiredFields.forEach(reqKey => {
  //   if(keys === reqKey) {
  //     console.log(true);
  //   }
  //   else {
  //     console.log(false);
  //   }
  // })

  User.create({
    firstName: req.body.firsName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  .then(user =>
    res.json({username: user.username})
  )
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id)
  .then()
};

const deleteUser = (req, res) => {
  //to delete user we need to get the username and password
  User.deleteOne({ username: req.body.username, password: req.body.password })
  .then(res.json(`The account named ${req.body.username} has been deleted.`));
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
