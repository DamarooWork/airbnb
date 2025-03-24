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
    orderBy: {
      id: 'desc',
    },
  })
  if (bookings.length === 0) {
    return (
      <section className="flex flex-col justify-start gap-4">
        <h3 className="text-3xl text-red-400 mt-4">
          You have no upcoming trips.
        </h3>
      </section>
    )
  }
  return (
    <ul className="grid grid-cols-1  gap-4 mt-4">
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
