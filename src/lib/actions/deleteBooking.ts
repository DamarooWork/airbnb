'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '../../../db/prisma'
import { toast } from 'react-toastify'

export default async function actionDeleteBooking(bookingId: number) {
  const { userId } = await auth()
  if (userId)
    try {
      await prisma.booking.delete({
        where: {
          id: bookingId,
        },
      })
      toast.success('The booking was successfully deleted!')
      redirect('/search')
    } catch (e) {
      console.log(e)
    }
}
