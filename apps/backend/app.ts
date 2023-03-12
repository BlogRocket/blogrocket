import express from 'express';
import path from 'path';
import * as fs from 'fs';

const PORT = parseInt(process.env.PORT!) || 5001;
const HOST = process.env.HOST || 'localhost';

const app = express();

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

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
