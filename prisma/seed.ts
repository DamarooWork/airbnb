import { PrismaClient } from '@prisma/client'
import { data } from './listingData'
const prisma = new PrismaClient()
async function main() {
  console.log('starting to seed...')
  const upsertPromises = data.map(listing=> prisma.listing.upsert({
    where: {id: listing.id},
    update: {},
    create: listing
  }))
  await Promise.all(upsertPromises)
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
