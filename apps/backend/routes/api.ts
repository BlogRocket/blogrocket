import express from 'express';
import appRoute from './app';

const router = express.Router();

router.get('/ping', (_req, res) => {
  res.send('pong');
});

export default router;
