import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js'
import getProcent from '../utils/getProcent.js'

export const index = async (req, res) => {
  try {
    let users = await prisma.user.findMany({ where: { NOT: { role: 2 }, status: true }, include: { info: true } })

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
    // function getProcent() {
    //   if (user.info[0].lost + parseInt(data.sum - data.minus) <= 100000) {
    //     return 10
    //   }
    //   else if (user.info[0].lost + parseInt(data.sum - data.minus) <= 500000 && user.info[0].lost + parseInt(data.sum - data.minus) > 100000) {
    //     return 20
    //   }
    //   else if (user.info[0].lost + parseInt(data.sum - data.minus) > 500000) {
    //     return 30
    //   }
    // }
    let procent = await getProcent(user.id)



    let tmpUser = {
      bonuses: data.minus ? user.info[0].bonuses - parseInt(data.minus) : Math.floor((data.sum * procent) / 100),
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
                lost: tmpUser.lost,
              }
            }
          }
        }
      }).then(newUser => {
        if (data.minus) {
          sendClient(res, 200, { message: `Списано ${data.minus} бонусов с аккаунта ${user.name}.<br> Остаток ${newUser.info[0].bonuses} бонусов` })
        } else {
          sendClient(res, 200, { message: `Зачислено ${tmpUser.bonuses} бонусов на аккаунт ${user.name}.<br> На счету ${newUser.info[0].bonuses} бонусов` })
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

export const exportUsers = async (req, res) => {
  res.json('В разработке...')
}

export const getCashback = async (req, res) => {
  try {
    let cashback = await prisma.loyals.findMany({})
    return sendClient(res, 200, { message: 'ok', data: cashback })
  } catch (e) {
    sendClient(res)
  }
}

export const saveCashback = async (req, res) => {
  let { data } = req.body

  data.forEach(async (element, index) => {
    try {

      await prisma.loyals.update({
        where: {
          id: index + 1,
        },
        data: {
          cashback: element.cashback,
          counter: element.counter
        }
      })

    } catch (e) {
      sendClient(res)
    }
  });
  return sendClient(res, 200, { message: 'Кешбек система обновлена' })
}

export const destroy = async (req, res) => {

}

