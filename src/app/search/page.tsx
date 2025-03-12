'use client'
import ListingList from '../../ui/listing/List'
import useGetListings from '@/hooks/fetch/useGetListings'

export default function Search() {
  const { data, isLoading, isError } = useGetListings({
    params: {
      orderBy: {
        id: 'asc',
      },
    },
  })
  return <ListingList data={data} isLoading={isLoading} isError={isError} />
}
