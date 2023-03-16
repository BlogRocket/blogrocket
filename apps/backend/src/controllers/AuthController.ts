import User from '../models/User';
import AppError from '../errors/appError';
import Cache from '../services/cache';
import handleAsync from '../utils/handleAsync';
import JwtService from '../services/jwt';
import { getEnv } from '../utils/config';

/** Handles all authentication related requests */
export class AuthController {
  /** Sends a verification email to the user */
  static verifyMail = handleAsync(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new AppError('Email is required');

    const user = await User.findOne({ email });
    if (user) throw new AppError('An account with this mail already exist');

    const code = Math.floor(Math.random() * 9000) + 1000;
    await Cache.set(`verify_${code}`, email, 60 * 60);
    //TODO: mail to user and do not send code in response
    res.status(200).send({ status: 'success', code });
  });

  /** Signs up a new user */
  static signup = handleAsync(async (req, res) => {
    const { email, password, code } = req.body;

    if (!email) throw new AppError('Email is required');
    if (!password) throw new AppError('Password is required');
    if (!code) throw new AppError('Verification code is required');

    const cachedEmail = await Cache.get(`verify_${code}`);
    if (!cachedEmail || cachedEmail !== email) throw new AppError('Invalid verification code');
    await Cache.del(`verify_${code}`)

    const username = email.split('@')[0];
    const user = await User.create({ email, username, password });
    if (!user) throw new AppError('User not created');

    const { access, refresh } = JwtService.generate(user._id.toString(), user.email);

    res.status(201).send({
      status: 'success',
      user: { id: user._id, email: user.email, username: user.username },
      access,
      refresh
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

    const { access, refresh } = JwtService.generate(user._id.toString(), user.email);
    res.status(200).send({
      status: 'success',
      user: { id: user._id, email: user.email, username: user.username },
      access,
      refresh
    });
  });

  /** Refreshes a user's access token */
  static refresh = handleAsync(async (req, res) => {
    const { user, body: { refresh: token } } = req;
    const { access, refresh } = JwtService.generate(user._id.toString(), user.email);
    await Cache.set(`non_refresh_${token}`, "1", parseInt(getEnv('JWT_REFRESH_EXPIRES_IN'), 10));
    res.status(200).send({
      status: 'success',
      access,
      refresh
    });
  });

  /** Logs out a user */
  static logout = handleAsync(async (req, res) => {
    const { refresh: token } = req.body
    await Cache.set(`non_refresh_${token}`, "1", parseInt(getEnv('JWT_REFRESH_EXPIRES_IN'), 10));
    res.send('Logged out');
  });
}
