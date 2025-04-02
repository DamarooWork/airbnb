import Card from '@/ui/listing/Card'
import { FavoriteListing, Listing } from '@prisma/client'
import LoadingSkeletonListingList from '../loaders/LoadingSkeletonListingList'
import { prisma } from '../../../db/prisma'
import { auth } from '@clerk/nextjs/server'

interface ListProps {
  listings: Listing[]
  isLoading?: boolean
  isError?: Error | null
}

export default async function List({
  listings,
  isLoading,
  isError,
}: ListProps) {
  let isFav: FavoriteListing | null = null
  if (isLoading) return <LoadingSkeletonListingList />
  const { userId } = await auth()
  if (isError) {
    console.error('Error fetching listings:', isError)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-4xl text-red-300 italic text-center">
          Oops, an error occurred. Please try again later.
        </p>
      </div>
    )
  }
  if (!listings || listings.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-4xl text-red-300  ">
          Oops, there are no such places! Try to find another one or come back
          later!
        </p>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6  gap-4 sm:gap-8">
      {listings.map(async (listing: Listing, i: number) => {
        if (userId) {
          isFav = await prisma.favoriteListing.findFirst({
            where: {
              userId,
              listingId: listing.id,
            },
          })
        }
        return <Card key={listing.id} listing={listing} isFav={isFav} i={i} />
      })}
    </ul>
  )
}
