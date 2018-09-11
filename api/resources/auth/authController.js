import User from '../user/userModels';
import jwt from 'jsonwebtoken';
import {  
  JWT_SECRET,
  JWT_EXPIRY
} from '../../../config/config';

const createAuthToken = (user) => {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

//request to register a new user, with a given username and password
const registerUser = (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));
  //check if username and password values are strings
  if(!missingField) {
    if(typeof req.body.username === 'string' &&
    typeof req.body.password === 'string'){
      
      req.body.username = req.body.username.trim();
  
      User.find({ username: req.body.username })
      .then(user => {
        if(!user) {
          console.log(`The user '${user.username} has already been taken.`);
        }else {
          if(req.body.password !== req.body.password.trim()){
            console.log('no spaces allowed in the beginning or end of password.');
          }else {
            if(req.body.password.length < 8){
              console.log('Password needs to be at least 8 characters long.');
            }else { 
              User.hashPassword(req.body.password)
              .then(pw => {
                req.body.password = pw;
                User.create(req.body)
                .then(user => res.status(201).json(`${user.username} has been created.`))
              })
              .catch(err => console.log(`failed to create user. \n ${err.message} `));
            }
          }
        }
      })
    }else {
      console.log('username or password is not a string value.');
    }
  }else {
    console.log(`${missingField} field is missing.`);
  }
};

//request a JWT/ A valid username and password are required , and a new token is given in exchange.
const loginUser = (req, res) => {
  User.findOne( { username: req.body.username } )
  .then(user => {
    user.comparePw(req.body.password, user.password)
    .then(user => {
      if(user) {
        const authToken = createAuthToken({username: req.body.username});
        console.log('Login was successful.');
        res.status(202).json({authToken});
      }else {
        console.log('Login was not successful, invalid password.');
        res.status(401).json('Invalid password.');
      }
    })
  })
  .catch(err => res.status(400).json(`Invalid username, \n error message: ${err.message}`));
};

//request for a protected API endpoint. A valid, non-expired JWT is required. You use the same JWT to make as many requests as you like until it expires.
const checkJwt = (req, res) => {

};
//request a new JWT with a laster expiry date. A valid, non-expired JWT is required.
const newJWT = (req, res) => {
  const newJWT = createAuthToken(req.body.authToken)
};


export {
  registerUser,
  loginUser
};