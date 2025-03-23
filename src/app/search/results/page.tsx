'use client'
import ListingList from '../../../ui/listing/List'
import useGetListings from '@/hooks/fetch/useGetListings'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { useDebounce } from 'react-use'
import { Listing } from '@prisma/client'

export default function ResultsPage() {
  const params = useMemo(() => {
    return {
      orderBy: {
        id: 'desc',
      },
    }
  }, [])
  const { data, isLoading, isError } = useGetListings({
    params,
  })
  const location = useSearchStore((state) => state.location)
  const [filteredData, setFilteredData] = useState<Listing[]>([])

  const filterData = useCallback(() => {
    setFilteredData(
      data.filter((list) =>
        list.title.toLowerCase().includes(location.toLowerCase())
      )
    )
  }, [data, location])
  const [isReady] = useDebounce(filterData, 800, [location, data])
  useEffect(() => {
    if (isReady()) {
      filterData()
    }
  }, [isReady, filterData])

  return (
    <section>
      <section className="flex items-center justify-start w-full h-24 ">
        <h1 className="text-4xl font-bold">Search results:</h1>
      </section>
      <ListingList
        data={location !== '' ? filteredData : data}
        isLoading={!isReady() || isLoading}
        isError={isError}
      />
    </section>
  )
}
