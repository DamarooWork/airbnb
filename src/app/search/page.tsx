'use client'
import { useMemo } from 'react'
import ListingList from '../../ui/listing/List'
import useGetListings from '@/hooks/fetch/useGetListings'

export default function Search() {
  const params = useMemo(() => {
    let param = {
      orderBy: {
        id: 'asc',
      },
    }
    return param
  }, [])
  const { data, isLoading, isError } = useGetListings({ params })
  return <ListingList data={data} isLoading={isLoading} isError={isError} />
}
