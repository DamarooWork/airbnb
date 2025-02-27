import Link from 'next/link'
import { IListing } from '../../api/search/route'
import ResultsList from './components/resultsList'

export default async function Results() {
  const res = await fetch('http://localhost:3000/api/search')
  const data: IListing[] = await res.json()
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
      <ResultsList data={data} />
    </>
  )
}
