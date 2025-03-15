'use client'
import { Prisma } from '@prisma/client'
// @ts-expect-error listingSelect is using only for type, that's it
const listingSelect = {
  id: true,
  availabilities: true,
} satisfies Prisma.ListingSelect

type ListingPayload = Prisma.ListingGetPayload<{ select: typeof listingSelect }>

interface CalendarProps {
  listing: ListingPayload
}

export default function Calendar({ listing }: CalendarProps) {
  return (
    <section>
      <h2>Available Dates</h2>
      {(!listing.availabilities || listing.availabilities.length === 0) && (
        <>
          <p>No Available Dates</p>
        </>
      )}
    </section>
  )
}
