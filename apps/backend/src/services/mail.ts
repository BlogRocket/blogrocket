import nodemailer from 'nodemailer';
import { sendVerifyCodeMailTemplate } from '../templates';
import { getEnv } from "../utils/config";

export default class MailService {
  static sendVerifyToken(to: string, token: string) {
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: getEnv('MAIL_USER'),
        pass: getEnv('MAIL_PASS'),
        clientId: getEnv('MAIL_CLIENT_ID'),
        clientSecret: getEnv('MAIL_CLIENT_SECRET'),
        refreshToken: getEnv('MAIL_REFRESH_TOKEN'),
      }
    });

    const mailOptions = {
      from: getEnv('MAIL_USER'),
      to,
      subject: 'Verify your email',
      html: sendVerifyCodeMailTemplate(token)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  }
}