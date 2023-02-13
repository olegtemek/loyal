
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js';

export default async (req, res, next) => {
  let { token } = req.cookies;
  try {
    let check = await checkToken(token)
    if (check.code != 200) {
      return sendClient(res, check.code, { user: check.user })
    }
    req.user = check.user
    next()
  } catch (e) {
    sendClient(res)
  }
}



async function checkToken(token) {
  let result = jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return { message: "Токен умер)", code: 401 }
    let result = prisma.user.findFirst({
      where: {
        number: decoded.number
      },
      include: {
        info: true
      }
    }).then(user => {
      if (!user.status) return { message: "Пожалуйста подтвердите ваш Email", user: user, code: 202 }
      return { code: 200, message: "ok", user: user }
    }).catch(e => {
      return { message: "Пользователь не найден", code: 401 }
    })
    return result
  })
  return result
}