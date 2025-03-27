import { prisma } from '../../../db/prisma'
import ListingList from '../../ui/listing/List'

export default async function SearchPage() {
  const listings = await prisma.listing.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  return (
    <section className="my-2 sm:my-6">
      <ListingList listings={listings} />
    </section>
  )
}
