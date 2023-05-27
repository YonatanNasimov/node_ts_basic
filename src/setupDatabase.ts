import mongoose from 'mongoose';
import { config } from '@root/config';


export default () => {
  const connect = () => {
    mongoose
      .connect(`${config.DATABASE_URL}`)
      .then(() => {
        console.log('MongoDB connect...');
      })
      .catch((error) => {
        console.log('Error connecting to the database', error);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};