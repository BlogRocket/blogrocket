import mongoose from 'mongoose';
import { getEnv } from './config';

export default class Db {
  static async connect() {
    try {
      await mongoose.connect(getEnv('MONGO_URI'));
    } catch (error) {
      console.error(error);
    }
  }
}