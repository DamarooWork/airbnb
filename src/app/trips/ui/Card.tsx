import { Prisma } from '@prisma/client'
import { bookingSelect } from './List'
import TripCancel from './TripCancel'
import Link from 'next/link'
import ImageForCard from './ImageForCard'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

interface CardProps {
  booking: Prisma.BookingGetPayload<{ select: typeof bookingSelect }>
}
export default async function Card({ booking }: CardProps) {
  return (
    <li className="card h-48 sm:h-60 shadow-md hover:shadow-xl flex-row transition-shadow duration-300 ease-in-out">
      <div className="relative w-48 min-w-48 sm:w-60 sm:min-w-60 aspect-square">
        <ImageForCard
          imgAlt={booking.listing.title}
          imgUrl={booking.listing.image}
        />
      </div>
      <section className="flex flex-col justify-between  p-3 overflow-hidden ">
        <header>
          <h2 className="text-2xl font-semibold text-primary  line-clamp-1 group">
            <Link
              className="flex flex-row gap-1 items-center w-fit"
              href={`/rooms/${booking.listing.id}`}
            >
              {booking.listing.title}
              <ArrowUpRightIcon className="size-6 min-w-6 min-h-6 group-hover:scale-110" />
            </Link>
          </h2>
          <p className="text-red-400 text-xl line-clamp-3">
            {booking.listing.description}
          </p>
        </header>
        <footer className="flex flex-col sm:flex-row sm:text-center sm:items-center sm:gap-2 font-bold text-primary ">
          <span>{booking.startDate.toLocaleDateString()}</span>
          <span className="hidden sm:inline">-</span>
          <span>{booking.endDate.toLocaleDateString()}</span>
        </footer>
      </section>
      <TripCancel bookingId={booking.id} />
    </li>
  )
}
