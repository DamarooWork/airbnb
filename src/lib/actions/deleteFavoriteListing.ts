'use server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../db/prisma'

export default async function actionDeleteFavoriteListing(listingId: number) {
  const { userId } = await auth()
  if (userId) {
    await prisma.favoriteListing.deleteMany({
      where: {
        listingId,
        userId,
      },
    })
  } else {
    auth.protect()
    return new Error('Auth error')
  }
}
