import { getEnv } from "../utils/config";

const APP_URL = getEnv('APP_URL')

export const verifyMailTemplate = (token) => `
  <div>
    <p>Hi there,</p>
    <p>Thanks for signing up for our service. Please verify your email by clicking the link below.</p>
    <a href="${APP_URL}/verify/${token}">Verify your email</a>
  </div>
`

export const sendVerifyCodeMailTemplate = (code) => `
  <div>
    <p>Hi there,</p>
    <p>Thanks for signing up for our service. Please verify your email by entering the code below.</p>
    <p>Code: ${code}</p>
  </div>
`
