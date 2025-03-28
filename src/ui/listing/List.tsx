import Card from '@/ui/listing/Card'
import Loader from '@/ui/loaders/Loader'
import { Listing } from '@prisma/client'

interface ListProps {
  listings: Listing[]
  isLoading?: boolean
  isError?: Error | null
}

export default function List({ listings, isLoading, isError }: ListProps) {
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
      {listings.map((listing: Listing) => {
        return <Card key={listing.id} listing={listing} />
      })}
    </ul>
  )
}
