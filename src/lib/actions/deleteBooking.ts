'use server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../db/prisma'
import { revalidatePath } from 'next/cache'

export default async function actionDeleteBooking(bookingId: number) {
  const { userId } = await auth()
  if (userId)
    try {
      await prisma.booking.delete({
        where: {
          id: bookingId,
        },
      })
    } catch (e) {
      console.log(e)
    } finally {
      revalidatePath('/trips')
    }
}
