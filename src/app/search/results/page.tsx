import ListingList from '../../../ui/listing/List'
import { Suspense } from 'react'
import HeaderH1 from '@/ui/header/HeaderH1'
import Loader from '@/ui/loaders/Loader'
import { prisma } from '../../../../db/prisma'
import { Listing } from '@prisma/client'
import HandleSearchParams from './ui/HandleSearchParams'

interface ResultsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>
}
export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { location, startdate, enddate } = await searchParams
  const loc = location?.toLowerCase()
  let start: string[] | Date = (startdate as unknown as string).split('.')
  start = new Date(+start[2], +start[1] - 1, +start[0])
  let end: string[] | Date = (enddate as unknown as string).split('.')
  end = new Date(+end[2], +end[1] - 1, +end[0])
  let listings: Listing[] = []
  let isError: Error | null = null
  let isLoading: boolean = false
  try {
    isLoading = true
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
          availabilities: {
            some: {
              OR: [
                {
                  createdAt: {
                    gte: start,
                  },
                },
                {
                  createdAt: {
                    lte: end,
                  },
                },
              ],
            },
          },
        },
        include: {
          availabilities: true,
        },
      })
    } else {
      listings = await prisma.listing.findMany({
        orderBy: {
          id: 'desc',
        },
        where: {
          availabilities: {
            some: {
              OR: [
                {
                  createdAt: {
                    gte: start,
                  },
                },
                {
                  createdAt: {
                    lte: end,
                  },
                },
              ],
            },
          },
        },
        include: {
          availabilities: true,
        },
      })
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      isError = error
      console.error('Error fetching listings:', error)
    }
  } finally {
    isLoading = false
  }

  return (
    <>
      <HeaderH1 title="Search results" />
      <HandleSearchParams />
      <Suspense fallback={<Loader size={200} />}>
        <ListingList
          listings={listings}
          isError={isError}
          isLoading={isLoading}
        />
      </Suspense>
    </>
  )
}
