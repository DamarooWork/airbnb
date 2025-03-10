'use client'
import Link from 'next/link'
import ResultsList from './components/ResultsList'
import useFetch, { PrismaListing } from '@/lib/hooks/fetch/useFetch'
import { IListing } from '@/app/api/search/route'
import { useCallback, useEffect, useState } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { useDebounce } from 'react-use'
import Head from 'next/head'

export default function Results() {
  const { data, isLoading } = useFetch()
  const location = useSearchStore((state) => state.location)
  const [filteredData, setFilteredData] = useState<PrismaListing[]>([])

  const filterData = useCallback(() => {
    setFilteredData(
      data.filter((list) =>
        list.title.toLowerCase().includes(location.toLowerCase())
      )
    )
  }, [data, location])
  const [isReady] = useDebounce(filterData, 500, [location, data])
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
      <ResultsList
        data={location !== '' ? filteredData : data}
        isLoading={!isReady() || isLoading}
      />
    </section>
  )
}
