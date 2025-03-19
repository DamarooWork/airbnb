import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../../../db/prisma'
import { notFound } from 'next/navigation'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
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
    <section className="">
      {listing.image && (
        <div className="relative w-full max-h-[300px] h-[300px] rounded-2xl ">
          <Image
            className="object-cover rounded-2xl  "
            src={listing.image}
            alt={listing.title}
            priority
            fill
            sizes="100vw"
          />
        </div>
      )}

      <section className="text-xl">
        <header className="mt-4">
          <h1 className="text-4xl font-bold">{listing?.title}</h1>
        </header>
        <p>{listing.description}</p>
        <p>Price - {listing.price}$ per day</p>
        <section className="flex gap-2  items-center">
          <StarIcon className="w-8 h-auto text-primary" />
          <p>{listing.rating || '0'}</p>
        </section>
        <section className="flex gap-2  items-center">
          <MapPinIcon className="w-8 h-auto text-primary" />
          <p>{listing.location || 'No info about location'}</p>
        </section>

        <AvailabilitiesCalendar listing={listing} />
      </section>
    </section>
  )
}
