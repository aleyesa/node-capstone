import User from '../user/userModels';
import LocalStrategy  from 'passport-local';
// import { JwtStrategy, Extract-Jwt } from 'passport-jwt';

// const localStrategy = new LocalStrategy((username, password, callbackfn) => {
//   User.findOne( { username: username } )
//   .then(user => {
//     user.comparePw(password, user.password)
//     .then(user => {
//       if(user) {
//         console.log('Login was successful.');
//         return callbackfn(null, user);
//       }else {
//         console.log('Login was not successful, invalid password.');
//         return callbackfn(null, false);
//       }
//     })
//   })
// });

// export default {
//   localStrategy
// };