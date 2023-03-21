import { Request, Response } from "express";
import AppError from "../errors/appError";
import Token from "../models/Token";
import TokenService from "../services/token";
import handleAsync from "../utils/handleAsync";

export default class TokenController {
  static getTokens = handleAsync(async (req, res) => {
    const userId = req.user._id.toString();
    const tokens = await Token.find({ userId });
    res.status(200).json({
      status: 'success',
      tokens
    });
  });

  static createToken = handleAsync(async (req, res) => {
    const userId = req.user._id.toString();
    const { expires, name } = req.body;
    if (!expires) throw new AppError('Expires is required');
    if (!name) throw new AppError('Name is required');
    if (isNaN(expires) || expires < 0) throw new AppError('Expires must be a positive number');

    const token = await Token.create({
      userId,
      token: TokenService.generateToken(),
      expires: Date.now() + expires * 1000,
      name
    });
    res.status(200).json({
      status: 'success',
      token: token.token,
      expires: token.expires.toISOString()
    });
  });

  static async deleteToken(req: Request, res: Response) {
    const userId = req.user._id.toString();
    const { id } = req.params;
    await Token.deleteOne({ userId, _id: id });
    res.status(200).json({
      status: 'success'
    });
  }

  static async regenerateToken(req: Request, res: Response) {
    const userId = req.user._id.toString();
    const { id } = req.params;
    const { expires } = req.body;

    if (isNaN(expires) || expires < 0) throw new AppError('Expires must be a positive number');

    const token = await Token.findOne({ userId, _id: id });
    if (!token) throw new AppError('Token not found');
    token.token = TokenService.generateToken();
    token.expires = new Date(Date.now() + expires * 1000);
    await token.save();

    res.status(200).json({
      status: 'success',
      token: token.token,
      expires: token.expires.toISOString()
    });
  }
}