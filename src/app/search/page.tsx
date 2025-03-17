'use client'
import { useMemo } from 'react'
import ListingList from '../../ui/listing/List'
import useGetListings from '@/hooks/fetch/useGetListings'

export default function SearchPage() {
  const params = useMemo(() => {
    return {
      orderBy: {
        id: 'asc',
      },
    }
  }, [])
  const { data, isLoading, isError } = useGetListings({ params })
  return <ListingList data={data} isLoading={isLoading} isError={isError} />
}
