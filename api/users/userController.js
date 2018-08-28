//import
const mongoose = require('mongoose');
const TEST_DATABASE = require('../../resources/config');
const { User } = require('./userModels');

//connects to database.
mongoose.connect(TEST_DATABASE, (err) => {
  console.log(err);
});

//checks if database connection was successful or not?
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  // we're connected!
  console.log('Testing database connected.');
});

//used for get request to get all users and some of the users account info.
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

//used for another get request to get a specific user by id.
const getUser = (req, res) => {
  User.findById(req.params.id)
  .then(user => res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
  }))
  .catch(err => {
    res.json(`${err}, user id not found.`)
    console.log(`${err}, user id not found.`)
  });
};

//used for post request to create a user account.
const createUser = (req, res) => {
  //check if required fields are listed
  // const requiredFields = ['firstName', 'lastName', 'username', 'password', 'email'];
  // for(let keys in req.body){
  //   requiredFields.forEach(reqKey => {
  //   if(keys === reqKey) {
  //     res.json()
  //     console.log(true);
  //   }
  //   else {
  //     console.log(false);
  //   }
  // })

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  .then(user =>
    res.json({username: user.username})
  )
  .catch(res.json('Could not create account due to improper inputs.'));
};

//Used for put request to update a users account info.
const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  .then(res.json({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  username: req.body.username,
  password: req.body.password,
  email: req.body.email
}))
  .catch(err => {
    res.json('Could not update user, due to missing or improper inputs.')
  });
};

//Used for delete request to delete a specified user by username and password.
const deleteUser = (req, res) => {
  //to delete user we need to get the username and password
  User.deleteOne({ username: req.body.username, password: req.body.password })
  .then(res.json(`The account named ${req.body.username} has been deleted.`))
  .catch(err => {
    res.json('Incorrect username or password, could not delete.')
  });
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
