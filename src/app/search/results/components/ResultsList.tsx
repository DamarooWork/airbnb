import { IListing } from '@/app/api/search/route'
import InfoCard from '@/app/search/components/infoCard.tsx'
import Loader from '@/ui/Loader'

export default function ResultsList({
  data,
  isLoading,
}: {
  data: IListing[]
  isLoading?: boolean
}) {
  if (isLoading) return <Loader />
  if (!data) {
    return (
      <section className="flex justify-center items-center py-10">
        <p className="text-4xl italic">
          Oops, there are no such places! Try to find another one or come back
          later!
        </p>
      </section>
    )
  }
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mt-4 ">
      {data.map((listing: IListing) => (
        <InfoCard key={listing.id} listing={listing} />
      ))}
    </ul>
  )
}
