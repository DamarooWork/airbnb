'use server'
import { prisma } from '../../../db/prisma'

const actionUpdateListingLocation = async (
  location: string,
  listingId: number
) => {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      location,
    },
  })
}
export default actionUpdateListingLocation
