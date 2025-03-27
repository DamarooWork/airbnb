'use server'
import { prisma } from '../../../db/prisma'
import { auth } from '@clerk/nextjs/server'
export default async function actionCreateFavoriteListing(listingId: number) {
  const { userId } = await auth()
  if (userId) {
    await prisma.favoriteListing.create({
      data: {
        listingId,
        userId: userId,
      },
    })
  } else {
    auth.protect()
    return new Error('Auth error')
  }
}
