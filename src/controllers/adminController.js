import excelJs from 'exceljs'
import prisma from '../../prisma/client.js'
import sendClient from '../utils/sendClient.js'
import getProcent from '../utils/getProcent.js'
import sendTransMail from '../utils/sendTransMail.js'

export const index = async (req, res) => {
  try {
    let users = await prisma.user.findMany({ where: { NOT: { role: 2 }, status: true }, include: { info: true } })

    if (req.user.role == 1) {
      users = await prisma.user.findMany({ where: { role: 0 }, include: { info: true } })
    }

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
    let procent = await getProcent(user.id)

    let tmpUser = {
      bonuses: data.minus ? user.info[0].bonuses - parseInt(data.minus) : Math.floor((data.sum * procent) / 100) + user.info[0].bonuses,
      lost: parseInt(data.sum) + user.info[0].lost,
    }

    if (!data.minus) {
      sendTransMail(req.user.name, data.sum, user.name)
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

export const sender = async (req, res) => {

  let { type } = req.body

  //type 0  = crystal auto

  try {

    let users = await prisma.user.findMany({ where: { role: 0, info: { every: { where: type } } } })

    let numbers = users.map((item) => item.number)


    let workbook = new excelJs.Workbook()
    let sheet = workbook.addWorksheet('numbers')

    sheet.columns = [
      {
        header: "Телефоны",
        key: "number",
        width: 25,
      }
    ]


    numbers.forEach(item => {
      sheet.addRow({
        number: item
      })
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "numbers.xlsx"
    );

    workbook.xlsx.write(res);

  } catch (e) {
    sendClient(res)
  }
}

