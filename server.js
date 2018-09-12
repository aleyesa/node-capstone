import express from 'express';
import appMiddleware from './middleware/appMiddlware';
import api from './api/api';
import { TEST_DATABASE } from './config/config';
import mongoose from 'mongoose';

mongoose.connect(TEST_DATABASE, { useNewUrlParser: true }, (err) => {
  if(err) {
  console.log(err);
  } else {
    console.log('database has been connected.');
  }
});
//create an express application
const app = express();  
app.use(express.static('public'));
appMiddleware(app, express);
api(app);

//run local host
app.listen(8080, () => console.log('Application listening to port 8080'));






