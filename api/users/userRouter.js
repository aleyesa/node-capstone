//import express
const express = require('express');
//import userController
const userController = require('./userController');
//import userRouter
const userRouter = express.Router();

//route to get a list of all users
userRouter.get('/users', (req, res) => {
  userController.getAllUsers(req, res);
})

userRouter.post('/user/createUser', (req, res) => {
  userController.createUser(req, res);
});

//main route for requests in regards to users by id
userRouter.route('/user/:id')
.get((req,res) => {
  userController.getUser(req, res);
})
.put((req, res) => {
  userController.updateUser(req, res);
});

userRouter.delete('/user/deleteAccount', (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = userRouter;