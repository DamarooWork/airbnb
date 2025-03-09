'use client'
import Link from 'next/link'
import ResultsList from './components/ResultsList'
import useFetch from '@/lib/hooks/fetch/useFetch'

export default function Results() {
  const { data, isLoading } = useFetch()
  return (
    <>
      <section
        className="flex items-center justify-center w-full h-48 bg-cover bg-center 
      bg-[url(/images/booking-website-hero.png)] "
      >
        <Link
          href={'/search/results'}
          className="rounded-full text-background bg-[#603775] hover:bg-[#7F3F7F] px-4 py-2"
        >
          Browse Stays
        </Link>
      </section>
      <ResultsList data={data} isLoading={isLoading} />
    </>
  )
}
