import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../../../db/prisma'
import { notFound } from 'next/navigation'

import Card from './ui/Card'
import AvailabilitiesCalendar from './ui/AvailabilitiesCalendar'
import HeaderH1 from '@/ui/header/HeaderH1'
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
    <>
      <HeaderH1 title="Edit your listing" container />
      <section className="max-w-[1500px] mx-auto w-full">
        <Card listing={listing} />
        <AvailabilitiesCalendar listing={listing} />
      </section>
    </>
  )
}
