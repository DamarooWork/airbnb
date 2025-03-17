'use server'
import { prisma } from '../../../db/prisma'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
export default async function actionCreateUserBooking(
  bookingInfo: Prisma.BookingUncheckedCreateInput
) {
  const createBooking = await prisma.booking.create({
    data: {
      ...bookingInfo,
    },
  })
  revalidatePath('/rooms/')
}
