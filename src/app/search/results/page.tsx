'use client'
import ListingList from '../../../ui/listing/List'
import useGetListings from '@/hooks/fetch/useGetListings'
import { useMemo } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { useSearchParams } from 'next/navigation'

export default function ResultsPage() {
  const params = useSearchParams()

  useSearchStore.setState({ location: params.get('location') as string })
  const fetchParams = useMemo(() => {
    if (params.get('location'))
      return {
        orderBy: {
          id: 'desc',
        },
        where: {
          OR: [
            {
              title: {
                search: params.get('location'),
              },
            },
            {
              description: {
                search: params.get('location'),
              },
            },
            {
              location: {
                search: params.get('location'),
              },
            },
          ],
        },
      }
    return {
      orderBy: {
        id: 'desc',
      },
    }
  }, [params])
  const { data, isLoading, isError } = useGetListings({
    params: fetchParams,
  })

  return (
    <section>
      <header className="flex items-center justify-start w-full py-2 sm:py-4">
        <h1 className="text-4xl font-bold text-primary">Search results:</h1>
      </header>
      <ListingList data={data} isLoading={isLoading} isError={isError} />
    </section>
  )
}
