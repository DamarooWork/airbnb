'use client'

import useGetListings from '@/hooks/fetch/useGetListings'
import Loader from '@/ui/Loader'

import { useMemo } from 'react'

import Card from './Card'
import { Prisma } from '@prisma/client'

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
export default function List({ userId }: ListProps) {
  const params = useMemo(() => {
    return {
      where: {
        ownerId: userId,
      },
      include: {
        bookings: true,
      },
    }
  }, [userId])
  const { data, isLoading, isError } = useGetListings({
    params,
  })

  // const maxBookings = Math.max(...(data as Prisma.ListingGetPayload<{
  //   select: typeof listingSelect
  // }>[]).map((listing)=>listing?.bookings.length))
  return (
    <section>
      {isError && <p>Error</p>}
      {isLoading ? (
        <Loader size={100} />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-4">
          {data.map(
            (
              listing: Prisma.ListingGetPayload<{
                select: typeof listingSelect
              }>
            ) => (
              <Card key={listing.id} listing={listing} />
            )
          )}
        </ul>
      )}
    </section>
  )
}
