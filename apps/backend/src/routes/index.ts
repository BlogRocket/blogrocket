import express from 'express';
import AuthController from '../controllers/AuthController';
import PostController from '../controllers/PostController';
import TokenController from '../controllers/TokenController';
import UserController from '../controllers/UserController';
import { requireAccess, requireAccessOrPAT, requireRefresh } from '../middlewares/auth';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/verify', AuthController.verifyMail);
router.delete('/logout', requireAccess, AuthController.logout);
router.post('/refresh', requireRefresh, AuthController.refresh);

router.get('/token', requireAccess, TokenController.getTokens);
router.post('/token', requireAccess, TokenController.createToken);
router.post('/token/:id', requireAccess, TokenController.regenerateToken);
router.delete('/token/:id', requireAccess, TokenController.deleteToken);

router.get('/post', requireAccessOrPAT, PostController.getAllPosts);
router.get('/post/:id', requireAccessOrPAT, PostController.getPost);
router.post('/post', requireAccess, PostController.createPost);

router.get('/me', requireAccess, UserController.me);

export default router;
