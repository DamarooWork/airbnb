import { Prisma } from '@prisma/client'
import Link from 'next/link'
import { listingSelect } from './List'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import ImageForCard from './ImageForCard'
interface CardProps {
  listing: Prisma.ListingGetPayload<{
    select: typeof listingSelect
  }>
  maxBookings: number
}
export default async function Card({ listing, maxBookings }: CardProps) {
  return (
    <li
      className="card shadow-gray-300 shadow-xl  text-xl transition-transform duration-300 ease-in-out group hover:scale-[1.01] will-change-transform "
      key={listing.id}
    >
      <Link
        href={`/host/listing/${listing.id}`}
        className="flex flex-col relative justify-between gap-4 p-4 aspect-square"
      >
        <ImageForCard imgAlt={listing.title} imgUrl={listing.image} />
        <header className="p-1 text-white  w-fit rounded">
          <h2 className="font-bold drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
            {listing.title}
          </h2>
        </header>
        <footer className="flex flex-col gap-2">
          {listing.bookings.length > 0 ? (
            <section className="flex gap-2 text-white  w-fit p-1 rounded">
              {listing.bookings.length === maxBookings && (
                <ArrowTrendingUpIcon className="w-6 h-auto text-green-600 drop-shadow-xl" />
              )}
              <span className="drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
                Booked{' '}
                <span className="font-bold">{listing.bookings.length}</span>x
                {listing.bookings.length === 1 ? ' time' : ' times'}
              </span>
            </section>
          ) : (
            <p className="text-gray-200 drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)] w-fit ">
              No bookings yet
            </p>
          )}
        </footer>
      </Link>
    </li>
  )
}
