import nodeMailer from 'nodemailer'
import sendClient from '../utils/sendClient.js';

export default (email, code) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    secure: false,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_EMAIL,
    to: email,
    subject: 'Подтверждение почты с сайта',
    text: `
    Здравствуйте, ваш код верификации: ${code}
    `,
  };

  let result = transporter.sendMail(mailOptions, err => {
    if (err) {
      return
    }
  })
}