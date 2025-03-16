'use server'
import { prisma } from '../../../db/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

export default async function actionSubmitBookingDates(
  listingId: number,
  /* eslint-disable */
  //@ts-ignore
  dateranges: Prisma.ListingCreateInput['availabilities']['create']
) {
  /* eslint-enable */
  const result = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      availabilities: {
        deleteMany: [],
        create: dateranges,
      },
    },
    include: {
      availabilities: true,
    },
  })

  if (result) revalidatePath('/host')
}
