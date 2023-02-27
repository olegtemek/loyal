import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

export const update = async (req, res) => {
  try {
    let { user } = req.body
    let saltPassword = null
    if (user.password) {
      await bcrypt.hash(user.password, parseInt(process.env.SALT)).then(result => {
        saltPassword = result
      }).catch(e => {
        sendClient(res)
      })
      user.password = saltPassword
    } else {
      delete user.password
    }
    if (user.more) {
      const findUser = await prisma.user.findFirst({
        where: { email: user.email }, include: { info: true }
      })

      await prisma.user.update({
        where: {
          id: findUser.id,
        },

        data: {
          info: {
            update: {
              where: {
                id: findUser.info[0].id
              },
              data: {
                bonuses: parseInt(user.more.bonuses),
                lost: parseInt(user.more.lost)
              }
            }
          }
        }
      })

    }
    else {
      await prisma.user.update({
        where: {
          email: req.user.email
        },
        data: user
      })
    }

    sendClient(res, 200, { message: 'Данные аккаунта успешно сохранены' })
  } catch (e) {
    sendClient(res)
  }
}
