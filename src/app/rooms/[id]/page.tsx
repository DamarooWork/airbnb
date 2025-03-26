import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import { prisma } from '../../../../db/prisma'
import BookingCalendar from './ui/BookingCalendar'
import ImageForCard from './ui/ImageForCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = await prisma.listing.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  if (listing)
    return {
      title: listing.title + ' - airbnb by Damaroo',
    }
}
export default async function RoomPage({
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
  if (!listing) {
    notFound()
  }

  return (
    <section className="max-w-[1500px]  mx-auto flex flex-col gap-4">
      <header>
        <h1 className="text-4xl font-bold text-primary">{listing?.title}</h1>
      </header>
      {listing.image && (
        <div className="relative w-full max-h-[400px] h-[400px] rounded-2xl ">
          <ImageForCard imgAlt={listing.title} imgUrl={listing.image} />
        </div>
      )}
      <section className="flex flex-col gap-2">
        <section className="text-2xl flex flex-col gap-2">
          <p>{listing.description}</p>
          <p>
            <span className="font-semibold underline">{listing.price}$</span>
            <span className="text-gray-600"> for 1 night</span>
          </p>
          <section className="flex gap-2  items-center">
            <StarIcon className="w-8 h-auto text-primary" />
            <p>{listing.rating || '0'}</p>
          </section>
          <section className="flex gap-2  items-center">
            <MapPinIcon className="w-8 h-auto text-primary" />
            <p>{listing.location || 'No info about location'}</p>
          </section>
        </section>
        {userId && <BookingCalendar listing={listing} userId={userId} />}
      </section>
    </section>
  )
}
