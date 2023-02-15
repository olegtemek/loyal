import dotenv from 'dotenv'
dotenv.config()
import nodeMailer from 'nodemailer'

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


  const text = `<p><h1>Здравствуйте</h1>, для восстановления пароля перейдите по ссылке: <a href="${process.env.APP_URL}reset-code?code=${code}">Тык.</a></p>`
  const mailOptions = {
    from: 'Подтверждение почты с сайта',
    to: email,
    subject: 'Подтверждение почты с сайта',
    html: text
  };

  let result = transporter.sendMail(mailOptions, err => {
    if (err) {
      return
    }
  })
}