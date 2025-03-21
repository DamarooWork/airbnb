import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../../../db/prisma'
import { notFound } from 'next/navigation'

import Card from './ui/Card'
import AvailabilitiesCalendar from './ui/AvailabilitiesCalendar'
export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { userId } = await auth()
  const { id } = await params
  const listing = await prisma.listing.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { availabilities: true, bookings: true },
  })
  if (listing?.ownerId !== userId) {
    notFound()
  }

  return (
    <section className="max-w-[1500px] mx-auto flex flex-col gap-4">
      <header className="mt-4">
        <h1 className="text-4xl font-semibold  text-primary">
          Edit your listing:
        </h1>
      </header>
      <Card listing={listing} />
      <AvailabilitiesCalendar listing={listing} />
    </section>
  )
}
