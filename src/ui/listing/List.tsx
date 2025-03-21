'use client'
import { useMemo } from 'react'
import Card from '@/ui/listing/Card'
import Loader from '@/ui/Loader'
import { Listing } from '@prisma/client'

interface ListProps {
  data: Listing[]
  isLoading?: boolean
  isError?: Error | null
}

export default function List({ data, isLoading, isError }: ListProps) {
  const memoizedCards = useMemo(
    () =>
      data.map((listing: Listing) => {
        return <Card key={listing.id} listing={listing} />
      }),
    [data]
  )
  if (isLoading) return <Loader size={100} />

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

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8 mt-4`}
    >
      {memoizedCards}
    </ul>
  )
}
