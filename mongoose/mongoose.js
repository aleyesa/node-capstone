import mongoose from 'mongoose';
import TEST_DATABASE from '../config/config';

const Schema = mongoose.Schema;

const newModel = (path, schema) => {
  return mongoose.model(path, schema);
}

const connectToDatabase = mongoose.connect(TEST_DATABASE, { useNewUrlParser: true }, (err) => {
  if(err) {
  console.log(err);
  } else {
    console.log('database has been connected.');
  }
});

export default {
  Schema,
  newModel,
  connectToDatabase
};