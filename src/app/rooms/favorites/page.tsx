import { auth } from '@clerk/nextjs/server'
import HeaderH1 from '@/ui/header/HeaderH1'
import { prisma } from '../../../../db/prisma'
import List from '@/ui/listing/List'
import { Listing } from '@prisma/client'
import Empty from './ui/Empty'
import { Suspense } from 'react'
import LoadingSkeletonListingList from '@/ui/loaders/LoadingSkeletonListingList'

export default async function FavoritesPage() {
  const { userId } = await auth()
  const favoriteListings = await prisma.favoriteListing.findMany({
    where: {
      userId: userId!,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      listing: true,
    },
  })
  const listings: Listing[] = []
  favoriteListings.map((fav) => listings.push(fav.listing))
  return (
    <section className="flex flex-col relative ">
      <HeaderH1 title={'My favorite listings'} />
      <Suspense fallback={<LoadingSkeletonListingList />}>
        {listings.length === 0 ? <Empty /> : <List listings={listings} />}
      </Suspense>
    </section>
  )
}
