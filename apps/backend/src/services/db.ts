import mongoose from 'mongoose';
import { getEnv } from '../utils/config';

export default class Db {
  static async connect() {
    try {
      await mongoose.connect(getEnv('MONGO_URI'));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
