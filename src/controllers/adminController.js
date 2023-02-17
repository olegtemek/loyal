import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js'


export const index = async (req, res) => {
  try {
    let users = await prisma.user.findMany({ where: { role: 0, status: true }, include: { info: true } })

    sendClient(res, 200, { message: 'ok', users: users })
  } catch (e) {
    sendClient(res)
  }
}

export const transaction = async (req, res) => {
  const data = req.body


  try {


    let user = await prisma.user.findFirst({ where: { id: data.id }, include: { info: true } })

    if (!user) {
      return sendClient(res, 404, { message: 'Пользователь не найден' })
    }
    function getProcent() {
      if (user.info[0].lost + parseInt(data.sum - data.minus) <= 100000) {
        return 10
      }
      else if (user.info[0].lost + parseInt(data.sum - data.minus) <= 500000 && user.info[0].lost + parseInt(data.sum - data.minus) > 100000) {
        return 20
      }
      else if (user.info[0].lost + parseInt(data.sum - data.minus) > 500000) {
        return 30
      }
    }



    let tmpUser = {
      bonuses: data.minus ? user.info[0].bonuses - parseInt(data.minus) : Math.floor((data.sum * user.info[0].procent) / 100),
      procent: getProcent(),
      lost: parseInt(data.sum) + user.info[0].lost,
    }


    try {

      await prisma.user.update({
        where: {
          id: data.id
        },
        include: {
          info: true,
        },
        data: {
          info: {
            update: {
              where: {
                id: user.info[0].id
              },
              data: {
                bonuses: tmpUser.bonuses,
                procent: tmpUser.procent,
                lost: tmpUser.lost,
              }
            }
          }
        }
      }).then(newUser => {
        if (data.minus) {
          sendClient(res, 200, { message: `Списано ${data.minus} бонусов с аккаунта ${user.name}. Остаток ${newUser.info[0].bonuses} бонусов` })
        } else {
          sendClient(res, 200, { message: `Зачислено ${tmpUser.bonuses} бонусов на аккаунт ${user.name}. На счету ${newUser.info[0].bonuses} бонусов` })
        }
      })



    }
    catch (e) {
      sendClient(res)
    }
  }
  catch (e) {
    sendClient(res)
  }

}

export const store = async (req, res) => {

}

export const edit = async (req, res) => {

}

export const update = async (req, res) => {

}

export const destroy = async (req, res) => {

}

