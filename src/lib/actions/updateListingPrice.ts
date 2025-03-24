'use server'
import { prisma } from '../../../db/prisma'

const actionUpdateListingPrice = async (price: string, listingId: number) => {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      price: parseInt(price),
    },
  })
}
export default actionUpdateListingPrice
