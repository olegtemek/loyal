import prisma from '../../prisma/client.js'
export default async (userId) => {
  let user = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      info: true
    }
  })

  let procents = await prisma.loyals.findMany({})

  let procent = procents[0].cashback;

  procents.forEach(proc => {
    if (proc.counter <= user.info[0].lost) {
      return procent = proc.cashback
    }
  });

  return procent
}