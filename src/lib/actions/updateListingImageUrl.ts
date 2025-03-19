'use server'
import { prisma } from '../../../db/prisma'

const updateListingImageUrl = async (fileUrl: string, listingId: number) => {
  await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      image: fileUrl,
    },
  })
}
export default updateListingImageUrl
