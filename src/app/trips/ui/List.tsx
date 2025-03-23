import { Prisma } from '@prisma/client'
import { prisma } from '../../../../db/prisma'
import Card from './Card'

export const bookingSelect = {
  id: true,
  startDate: true,
  endDate: true,
  listing: true,
} satisfies Prisma.BookingSelect

interface ListProps {
  userId: string | null
}
export default async function List({ userId }: ListProps) {
  const bookings = await prisma.booking.findMany({
    where: {
      userId: userId!,
    },
    include: {
      listing: true,
    },
  })

  return (
    <ul className="flex flex-col gap-4 mt-4">
      {bookings.map(
        (
          booking: Prisma.BookingGetPayload<{ select: typeof bookingSelect }>
        ) => {
          return <Card key={booking.id} booking={booking} />
        }
      )}
    </ul>
  )
}
