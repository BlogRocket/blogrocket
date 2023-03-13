import express from 'express';
import path from 'path';
import * as fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import appRoute from './routes/app';
import apiRoute from './routes/api';
import errorMiddleware from './middlewares/error';
import Db from './utils/db';
import Cache from './utils/cache';
import { getEnv } from './utils/config';

dotenv.config();

const PORT = parseInt(getEnv('PORT')!) || 5001;
const HOST = getEnv('HOST') || 'localhost';

const app = express();

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
  return res.send("Hello World!");
});

app.use('/app/v0', appRoute);
app.use('/app/v0', apiRoute);

// Error handler
app.use(errorMiddleware);

Db.connect();
Cache.connect();

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;
