import { prisma } from '../../../db/prisma'
import ListingList from '../../ui/listing/List'

export default async function SearchPage() {
  const listings = await prisma.listing.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  return <ListingList listings={listings} />
}
