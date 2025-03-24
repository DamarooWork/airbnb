'use server'
import { prisma } from '../../../db/prisma'

const actionUpdateListingDescription = async (
  description: string,
  listingId: number
) => {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      description,
    },
  })
}
export default actionUpdateListingDescription
