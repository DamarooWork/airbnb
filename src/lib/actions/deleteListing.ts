'use server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../db/prisma'
export default async function actionDeleteListing(listingId: number) {
  const { userId } = await auth()
  if (userId)
    try {
      await prisma.listing.delete({
        where: {
          id: listingId,
        },
      })
    } catch (e) {
      console.log(e)
    }
}
