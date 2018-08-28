//import express
const express = require('express');
import appMiddleware from './middleware/appMiddlware';

const user = require('./api/users/user');

//create an express application
const app = express();

appMiddleware(app, express);
//use users http request methods from userRouter file.
app.use('/api', user);

//run local host
app.listen(8080, () => console.log('Application listening to port 8080'));


