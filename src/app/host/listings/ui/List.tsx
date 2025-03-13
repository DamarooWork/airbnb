'use client'

import useGetListings from '@/hooks/fetch/useGetListings'
import Loader from '@/ui/Loader'
import Link from 'next/link'
import { useMemo } from 'react'

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
        <ul>
          {data.map((listing) => (
            <li className="flex flex-col gap-2" key={listing.id}>
              <p className="font-bold">Title</p>
              <Link className="" href={`/rooms/${listing.id}`}>
                {listing.title}
              </Link>
              <p className="font-bold">Edit link</p>
              <Link href={`/host/listing/${listing.id}`}>{listing.id}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
