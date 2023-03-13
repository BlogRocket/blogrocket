import User from '../models/User';
import AppError from '../utils/appError';
import Cache from '../utils/cache';
import handleAsync from '../utils/handleAsync';
import { generateToken } from '../utils/jwt';

/** Handles all authentication related requests */
export class AuthController {

  /** Sends a verification email to the user */
  static verifyMail = handleAsync(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new AppError('Email is required');

    const code = Math.floor(Math.random() * 9000) + 1000;
    await Cache.set(`verify:${code}`, email, 60 * 60);
    //TODO: mail to user and do not send code in response
    res.status(200).send({ status: 'success', code });
  });

  /** Signs up a new user */
  static signup = handleAsync(async (req, res) => {
    const { email, password, code } = req.body;

    if (!email) throw new AppError('Email is required');
    if (!password) throw new AppError('Password is required');
    if (!code) throw new AppError('Verification code is required');

    const cachedEmail = await Cache.get(`verify:${code}`);
    if (!cachedEmail) throw new AppError('Invalid verification code');

    const username = email.split('@')[0];
    const user = await User.create({ email, username, password });
    if (!user) throw new AppError('User not created');

    const token = generateToken({ id: user._id, email: user.email });
    await Cache.del(`verify:${code}`);
    await Cache.set(`auth:${token}`, user._id.toString(), 60 * 60 * 24);

    res.status(201).send({ 
      status: 'success',
      user: { id: user._id, email: user.email, username: user.username },
      token
    });
  });

  /** Logs in a user */
  static login = handleAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email) throw new AppError('Email is required');
    if (!password) throw new AppError('Password is required');
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new AppError('Invalid email or password', 404);

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new AppError('Invalid email or password', 404);

    const token = generateToken({ id: user._id, email: user.email });
    res.status(200).send({
      status: 'success',
      user: { id: user._id, email: user.email, username: user.username },
      token
    });
  });

  /** Logs out a user */
  static logout = handleAsync(async (req, res) => {
    res.send('Logged out');
  });
}