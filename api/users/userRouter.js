//import express
const express = require('express');
//import userController
const userController = require('./userController');
//import userRouter
const userRouter = express.Router();

//route to get a list of all users
userRouter.route('/users')
.get((req, res) => {
  userController.getAllUsers(req, res);
})
.post((req, res) => {
  userController.createUser(req, res);
});

//main route for requests in regards to users by id
userRouter.route('/user/:id')
.get((req,res) => {
  userController.getUserById(req, res);
})
.put((req, res) => {
  userController.updateUser(req, res);
})
.delete((req, res) => {
  userController.deleteUser(req, res);
});

module.exports = userRouter;