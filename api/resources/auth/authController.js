import User from '../user/userModels';

//request to register a new user, with a given username and password
const registerUser = (req, res) => {

  User.find({ username: req.body.username })
  .then(user => {
    if(!user) {
      console.log(`The user '${user.username} has already been taken.`);
    }else {
      User.hashPassword(req.body.password)
      .then(pw => {
        req.body.password = pw;
        User.create(req.body)
        .then(user => res.json(user))
        .catch(console.log('Missing  one or more required inputs'));
      })
      .catch(console.log('failed to create user.'));
    }
  })
};

const loginUser = (req, res) => {
  User.find( { username: req.body.username } )
  .then(user => {
    // user.comparePw(req.body.password, user.password)
    res.json(user.comparePw(req.body.password, user.password));
  })
  // .then(result => console.log(result));
  // .catch(res.json('login was not successful.'));
};

//request a JWT/ A valid username and password are required , and a new token is given in exchange.

//request for a protected API endpoint. A valid, non-expired JWT is required. You use the same JWT to make as many requests as you like until it expires.

//request a new JWT with a laster expiry date. A valid, non-expired JWT is required.

export {
  registerUser,
  loginUser
};