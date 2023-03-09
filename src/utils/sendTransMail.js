import nodeMailer from 'nodemailer'
import sendClient from '../utils/sendClient.js';

export default (moderator, sum, name) => {
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
    to: process.env.MAIL_EMAIL,
    subject: 'Транзакция на сайте',
    text: `
    Модератор ${moderator} добавил сумму ${sum} пользователю ${name}
    `,
  };

  let result = transporter.sendMail(mailOptions, err => {
    if (err) {
      return
    }
  })
}