import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  console.log('starting to seed...')
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
    },
  })
  console.log('Successfully seeded')
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
