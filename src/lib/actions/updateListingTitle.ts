'use server'
import { prisma } from '../../../db/prisma'

const actionUpdateListingTitle = async (title: string, listingId: number) => {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      title
    },
  })
}
export default actionUpdateListingTitle
