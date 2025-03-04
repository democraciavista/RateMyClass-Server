import 'dotenv/config';
import nodemailer from 'nodemailer';

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
      from: `[damattag] <${process.env.EMAIL}>`,
      to: `${EmailConfig.userName} <${EmailConfig.userEmail}>`,
      subject: EmailConfig.subjectText,
      html: EmailConfig.html,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
