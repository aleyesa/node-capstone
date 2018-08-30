import express from 'express';
import appMiddleware from './middleware/appMiddlware';
import api from './api/api';

//create an express application
const app = express();

appMiddleware(app, express);
api(app);

//run local host
app.listen(8080, () => console.log('Application listening to port 8080'));





