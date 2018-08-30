//import
import connectToDatabase from '../../../mongoose/mongoose';
import User from './userModels';

connectToDatabase();

//used for get request to get all users and some of the users account info.
const getAllUsers = (req, res) => {
  //need check for required keys first
  User.find()
  .then(user => {
    res.json({users: user.map(accountInfo => {
      return {
        _id: accountInfo._id,
        firstName: accountInfo.firstName,
        firstName1: accountInfo.firstName1,
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
  .catch(err => res.json(err));
};
//Used for put request to update a users account info.
const updateUser = (req, res) => {
  const updatableFields = ['firstName', 'lastName', 'username', 'password', 'email'];
  //check if req body has unspecified keys
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    if (err) {
      return res.json(err);
    } else {
      res.json(user);
    }
  })
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

export { 
  getAllUsers,
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
};