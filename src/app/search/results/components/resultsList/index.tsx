import { IListing } from '@/app/api/search/route'
import InfoCard from '@/app/search/components/infoCard.tsx'

export default function ResultsList({ data }: { data: IListing[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mt-4 ">
      {data.map((listing: IListing) => (
        <InfoCard key={listing.id} listing={listing} />
      ))}
    </ul>
  )
}
