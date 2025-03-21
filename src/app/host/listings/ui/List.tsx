import Card from './Card'
import { Prisma } from '@prisma/client'
import { prisma } from '../../../../../db/prisma'

export const listingSelect = {
  id: true,
  image: true,
  title: true,
  description: true,
  bookings: true,
} satisfies Prisma.ListingSelect

interface ListProps {
  userId: string | null
}
export default async function List({ userId }: ListProps) {
  const listings = await prisma.listing.findMany({
    where: {
      ownerId: userId!,
    },
    include: {
      bookings: true,
    },
  })

  const maxBookings = Math.max(
    ...listings.map((listing) => listing.bookings.length)
  )

  return (
    <section>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-4">
        {listings.map(
          (
            listing: Prisma.ListingGetPayload<{ select: typeof listingSelect }>
          ) => (
            <Card key={listing.id} listing={listing} maxBookings={maxBookings} />
          )
        )}
      </ul>
    </section>
  )
}
