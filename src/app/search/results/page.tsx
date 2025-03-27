import ListingList from '../../../ui/listing/List'
import { Suspense } from 'react'
import HeaderH1 from '@/ui/header/HeaderH1'
import Loader from '@/ui/Loader'
import { prisma } from '../../../../db/prisma'
import { Listing } from '@prisma/client'
import HandleSearchParams from './ui/HandleSearchParams'

interface ResultsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}
export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { location } = await searchParams
  const loc = location?.toLowerCase()
  let listings: Listing[] = []
  let isError: Error | null = null
  try {
    if (location) {
      listings = await prisma.listing.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          OR: [
            { title: { search: loc } },
            { description: { search: loc } },
            { location: { search: loc } },
            { title: { contains: loc } },
            { description: { contains: loc } },
            { location: { contains: loc } },
          ],
        },
      })
    } else {
      listings = await prisma.listing.findMany({
        orderBy: {
          id: 'desc',
        },
      })
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      isError = error
      console.error('Error fetching listings:', error)
    }
  }

  return (
    <>
      <HeaderH1 title="Search results:" />
      <HandleSearchParams />
      <Suspense fallback={<Loader size={200} />}>
        <ListingList listings={listings} isError={isError} />
      </Suspense>
    </>
  )
}
