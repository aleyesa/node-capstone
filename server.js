//import express
const express = require('express');
//import bodyParser middleware
const bodyParser = require('body-parser');
const user = require('./api/users/user');
//create an express application
const app = express();
//use applications

//use bodyParser middleware to parse json string from body.
app.use(bodyParser.json());
//use users http request methods from userRouter file.
app.use('/api', user);

//run local host
app.listen(8080, () => console.log('Application listening to port 8080'));


