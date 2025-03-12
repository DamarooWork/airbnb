import { prisma } from '../../../../db/prisma'

export default async function getDataFromFetch() {
  return await prisma.listing.findMany()
}