import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail from '../utils/sendMailCode.js'
dotenv.config()


async function createToken(number) {
  let token = jwt.sign({ number: number }, process.env.SECRET, { expiresIn: 60 * 60 * 24 })
  return token
}

function makeCode(length = 5) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


export const login = async (req, res) => {
  try {
    let data = req.body
    let user = await prisma.user.findFirst({ where: { number: data.number } })

    if (!user) {
      return sendClient(res, 404, { message: 'Пользователь не найден' })
    }


    let result = await bcrypt.compare(req.body.password, user.password)

    if (!result) {
      return sendClient(res, 401, { message: 'Неверный пароль' })
    }

    let token = await createToken(user.number);

    delete user.password

    res.cookie('token', token)
    sendClient(res, 200, { data: token, user: user })

  } catch (e) {
    sendClient(res)
  }
}


export const registration = async (req, res) => {
  const tmpCode = makeCode();
  try {
    let data = req.body
    let saltPassword = null

    await bcrypt.hash(data.password, parseInt(process.env.SALT)).then(result => {
      saltPassword = result
    }).catch(e => {
      sendClient(res)
    })

    let user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        number: data.number,
        password: saltPassword,
        info: {
          create: {
            where: 1,
            bonuses: 0,
            procent: 10,
            lost: 0
          }
        },
      },
    })

    if (!req.user) {
      let code = await prisma.userConfirm.create({
        data: {
          code: tmpCode,
          User: {
            connect: {
              id: parseInt(user.id)
            }
          }
        }
      })
      sendMail(user.email, code.code)


      let token = await createToken(user.number);
      res.cookie('token', token)

      delete user.password
      sendClient(res, 200, { token: token, user: user })
    } else {

      sendClient(res, 200, { user: user })
    }



  } catch (e) {
    if (e.code === 'P2002' && e.meta.target == 'User_number_key') {
      sendClient(res, 401, { message: 'Номер телефона уже занят' })
    }
    else if (e.code == 'P2002' && e.meta.target == 'User_email_key') {
      sendClient(res, 401, { message: 'Данный email уже занят' })
    }
    else {
      sendClient(res)
    }
  }
}

export const registrationAdmin = async (req, res) => {
  try {
    let data = req.body
    let saltPassword = null

    await bcrypt.hash(data.password, parseInt(process.env.SALT)).then(result => {
      saltPassword = result
    }).catch(e => {
      sendClient(res)
    })

    let user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        number: data.number,
        password: saltPassword,
        role: 1,
        status: true,
        info: {
          create: {
            where: data.where,
            bonuses: 5000,
            procent: 10,
            lost: 0
          }
        }
      },
    })
    sendClient(res, 200, { message: "Пользователь успешно создан" })

  } catch (e) {
    if (e.code === 'P2002' && e.meta.target == 'User_number_key') {
      sendClient(res, 401, { message: 'Номер телефона уже занят' })
    }
    else if (e.code == 'P2002' && e.meta.target == 'User_email_key') {
      sendClient(res, 401, { message: 'Данный email уже занят' })
    }
    else {
      sendClient(res)
    }
  }
}




export const confirm = async (req, res) => {
  let { code, email } = req.body;

  try {
    let user = await prisma.user.findFirst({
      where: {
        email: email
      },
      include: {
        confirm: true
      }
    })

    if (code == user.confirm[0].code) {

      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { status: true }
        })

        await prisma.userConfirm.delete({
          where: {
            id: user.confirm[0].id
          }
        })

        sendClient(res, 200, { message: 'Аккаунт был подтвержден' })

      } catch (e) {
        sendClient(res)
      }

    } else {
      sendClient(res, 401, { message: 'Неправильный код' })
    }

  } catch (e) {
    sendClient(res)
  }

}


export const retry = async (req, res) => {
  let { email } = req.body;

  try {
    let user = await prisma.user.findFirst({
      where: {
        email: email
      },
      include: {
        confirm: true
      }
    })


    if (!user.confirm[0]?.code) {
      return sendClient(res, 401, { message: "Пользователь не найден" })
    }



    sendMail(user.email, user.confirm[0].code)


    sendClient(res, 200, { message: 'Сообщение с кодом успешно отправлено' })


  } catch (e) {
    sendClient(res)
  }
}