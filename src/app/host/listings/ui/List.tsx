'use client'

import useGetListings from '@/hooks/fetch/useGetListings'
import Loader from '@/ui/Loader'

import { useMemo, useState } from 'react'

import Card from './Card'
interface ListProps {
  userId: string | null
}
export default function List({ userId }: ListProps) {
  
  const params = useMemo(() => {
    return {
      where: {
        ownerId: userId,
      },
    }
  }, [])
  const { data, isLoading, isError } = useGetListings({
    params,
  })
  return (
    <section>
      {isError && <p>Error</p>}
      {isLoading ? (
        <Loader size={100} />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-4">
          {data.map((listing) => (
            <Card key={listing.id} listing={listing}/>
          ))}
        </ul>
      )}
    </section>
  )
}
