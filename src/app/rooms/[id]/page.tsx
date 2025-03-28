import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import { prisma } from '../../../../db/prisma'
import BookingCalendar from './ui/BookingCalendar'
import ImageForCard from './ui/ImageForCard'
import HeaderH1 from '@/ui/header/HeaderH1'
import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import { SVGChosenLeft, SVGChosenRight } from './ui/SVGChosen'

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
            <section className="flex gap-2  items-center">
              <StarIcon className="w-8 h-auto text-primary" />
              <p>{listing.rating || '0'}</p>
            </section>
            <section className="flex gap-2  items-center">
              <MapPinIcon className="w-8 h-auto text-primary" />
              <p>{listing.location || 'No info about location'}</p>
            </section>
            {listing.rating && listing.rating > 4.5 && (
              <section className="flex flex-col xl:flex-row justify-center items-center gap-4 border-primary border-[1px] rounded-2xl p-4 bg-red-50/50">
                <div className="flex flex-row items-center gap-1">
                  <SVGChosenLeft />
                  <h3 className="line-clamp-1 text-nowrap font-bold">Guest favorite</h3>
                  <SVGChosenRight />
                </div>
                <p className='text-center'>
                  One of the most loved homes on Airbnb, according to guests
                </p>
              </section>
            )}
          </section>
          {userId && <BookingCalendar listing={listing} userId={userId} />}
        </section>
      </section>
    </>
  )
}
