import { Listing } from '@prisma/client'
import { prisma } from '../../../db/prisma'
import ListingList from '../../ui/listing/List'

export default async function SearchPage() {
  let isError: Error | null = null
  let listings: Listing[] = []
  let isLoading: boolean = false
  try {
    isLoading = true
    listings = await prisma.listing.findMany({
      orderBy: {
        id: 'desc',
      },
    })
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log('Error fetching listings: ', e)
      isError = e
    }
  } finally {
    isLoading = false
  }

  return (
    <section className="my-2 sm:my-6">
      <ListingList
        listings={listings}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  )
}
