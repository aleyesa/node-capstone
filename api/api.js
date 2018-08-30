//require is equal to import
// const user = require('./api/resources/users/user');
import userRouter from './resources/user/userRouter';
//use users http request methods from userRouter file.

export default (app) => {
  app.use('/api', userRouter);
}

