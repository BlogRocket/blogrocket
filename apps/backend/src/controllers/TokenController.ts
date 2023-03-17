import { Request, Response } from "express";
import Token from "../models/Token";

export default class TokenController {
  static async createToken(req: Request, res: Response) {
    const userId = req.user._id.toString();
    const { expires } = req.body;
    const token = await Token.create({ userId, expires: Date.now() + expires * 1000 }); // expires in seconds
    res.status(200).json({
      status: 'success',
      token: token.token,
      expiresAt: token.expiresAt
    });
  }

  static async deleteToken(req: Request, res: Response) {
    const userId = req.user._id.toString();
    const { id } = req.params;
    await Token.deleteOne({ userId, _id: id });
    res.status(200).json({
      status: 'success'
    });
  }
}