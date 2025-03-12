'use client'
import Link from 'next/link'
import ListingList from '../../../ui/listing/List'
import useGetListings, { Listing } from '@/hooks/fetch/useGetListings'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { useDebounce } from 'react-use'
import Head from 'next/head'

export default function Results() {
  const params = useMemo(() => {
    let param = {
      orderBy: {
        id: 'asc',
      },
    }
    return param
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
      <Head>
        <title>123312</title>
      </Head>
      <section
        className="flex items-center justify-center w-full h-48 bg-cover bg-center 
      bg-[url(/images/booking-website-hero.png)] "
      >
        <Link
          href={'/search/results'}
          className="rounded-full text-background bg-[#603775] hover:bg-[#7F3F7F] px-4 py-2"
        >
          Reload
        </Link>
      </section>
      <ListingList
        data={location !== '' ? filteredData : data}
        isLoading={!isReady() || isLoading}
        isError={isError}
      />
    </section>
  )
}
