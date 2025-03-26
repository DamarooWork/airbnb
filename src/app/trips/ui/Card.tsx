import { Prisma } from '@prisma/client'
import { bookingSelect } from './List'
import TripCancel from './TripCancel'
import Link from 'next/link'
import ImageForCard from './ImageForCard'

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
        <header className="text-xl">
          <h2 className="font-semibold text-primary  line-clamp-1">
            <Link href={`/rooms/${booking.listing.id}`}>
              {booking.listing.title}
            </Link>
          </h2>
          <p className="text-red-400 line-clamp-3">
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
