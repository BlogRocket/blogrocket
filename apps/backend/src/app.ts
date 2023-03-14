import express from 'express';
import path from 'path';
import * as fs from 'fs';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import errorMiddleware from './errors/handler';
import Db from './services/db';
import Cache from './services/cache';

dotenv.config();

Db.connect();
Cache.connect();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/', (req, res, next) => {
  const publicPath = path.join(__dirname, 'public');
  if (fs.existsSync(publicPath)) {
    return express.static(path.join(__dirname, 'public'))(req, res, next);
  }
  return res.send('Hello World!');
});

app.use('/api/v0', router);

// Error handler
app.use(errorMiddleware);

export default app;
