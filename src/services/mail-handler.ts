import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const MailServer = async (EmailConfig: {
  userName: string;
  subjectText: string;
  html: string;
  userEmail: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: `${EmailConfig.userEmail}`,
      subject: EmailConfig.subjectText,
      html: EmailConfig.html,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
