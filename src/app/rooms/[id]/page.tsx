import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import { prisma } from '../../../../db/prisma'
import BookingCalendar from './ui/BookingCalendar'
import ImageForCard from './ui/ImageForCard'
import HeaderH1 from '@/ui/header/HeaderH1'
import { HandThumbUpIcon } from '@heroicons/react/24/solid'

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
    <>
      <HeaderH1 title={listing?.title} container />

      <section className="max-w-[1500px] mx-auto w-full flex flex-col gap-4">
        <div className=" relative w-full max-h-[400px] h-[400px] rounded-2xl ">
          <ImageForCard imgAlt={listing.title} imgUrl={listing.image} />
        </div>

        <section className="flex flex-col gap-2">
          <section className="text-2xl flex flex-col gap-2">
            <p>{listing.description}</p>
            <p>
              <span className="font-semibold underline">{listing.price}$</span>
              <span className="text-gray-600"> for 1 night</span>
            </p>
            <section className="flex flex-row gap-2 items-center">
              <div className="flex flex-col gap-2 ">
                <section className="flex gap-2  items-center">
                  <StarIcon className="w-8 h-auto text-primary" />
                  <p>{listing.rating || '0'}</p>
                </section>
                <section className="flex gap-2  items-center">
                  <MapPinIcon className="w-8 h-auto text-primary" />
                  <p>{listing.location || 'No info about location'}</p>
                </section>
              </div>
              {listing.rating && listing.rating > 4.5 && (
                <div className="border flex flex-row justify-center items-center p-4">
                  <h3>
                    <HandThumbUpIcon className="size-10 min-h-10 min-w-10 text-primary mr-2" />
                    Guest favorite
                  </h3>
                  <p>
                    One of the most loved homes on Airbnb, according to guests
                  </p>
                </div>
              )}
            </section>
          </section>
          {userId && <BookingCalendar listing={listing} userId={userId} />}
        </section>
      </section>
    </>
  )
}
