import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'mjweather',
      email: 'wzero99@gmail.com'
    }
  })
  console.log(user)

  const serverItemTypes = []
  serverItemTypes.push(await prisma.serverItemType.create({ data: { id: 'MESSAGE' } }))
  serverItemTypes.push(await prisma.serverItemType.create({ data: { id: 'AUDIO' } }))
  serverItemTypes.push(await prisma.serverItemType.create({ data: { id: 'VIDEO' } }))
  console.log(serverItemTypes)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
