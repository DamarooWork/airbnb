import { prisma } from '../../../../db/prisma'

export default async function getDataFromFetch() {
  const resp = await prisma.listing.findMany()
  console.log(resp)

  return resp
}
