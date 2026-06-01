import nodemailer, { type Transporter } from "nodemailer";
import { env } from "./env.js";

export const mailerTransporter: Transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: true,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
