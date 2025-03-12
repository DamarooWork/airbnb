'use client'
import { useMemo } from 'react'
import Card from '@/ui/listing/Card'
import { Listing } from '@/hooks/fetch/useGetListings'
import Loader from '@/ui/Loader'

interface ListProps {
  data: Listing[]
  isLoading?: boolean
  isError?: Error | null
}

export default function List({ data, isLoading, isError }: ListProps) {
  if (isLoading) return <Loader />

  if (isError) {
    console.error('Error fetching listings:', isError)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-4xl italic text-center">
          Oops, an error occurred: {isError.message}. Please try again later.
        </p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-4xl italic text-center">
          Oops, there are no such places! Try to find another one or come back
          later!
        </p>
      </div>
    )
  }

  const memoizedCards = useMemo(
    () =>
      data.map((listing: Listing) => {
        return <Card key={listing.id} listing={listing} />
      }),
    [data]
  )

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-4`}
    >
      {memoizedCards}
    </ul>
  )
}
