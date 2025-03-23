'use client'
import { Prisma } from '@prisma/client'
import { bookingSelect } from './List'
import Image from 'next/image'
import { useState } from 'react'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import TripCancel from './TripCancel'
import Link from 'next/link'

interface CardProps {
  booking: Prisma.BookingGetPayload<{ select: typeof bookingSelect }>
}
export default function Card({ booking }: CardProps) {
  const [image, setImage] = useState<string>(
    booking.listing.image ? booking.listing.image : imagePlaceholder
  )
  return (
    <li className="card h-48 sm:h-60 shadow-md hover:shadow-xl flex-row transition-shadow duration-300 ease-in-out">
      <div className="relative w-48 min-w-48 sm:w-60 sm:min-w-60 aspect-square">
        <Image
          className="object-cover rounded-l-2xl"
          onError={() => setImage(imagePlaceholder)}
          src={image}
          alt={booking.listing.title}
          fill
          priority
          sizes="(max-width: 640px) 192px 192px, 240px 240px"
        />
      </div>
      <section className="flex flex-col justify-between  p-4 overflow-hidden ">
        <header className="text-xl">
          <h2 className="font-semibold text-primary whitespace-nowrap">
            <Link href={`/rooms/${booking.listing.id}`}>
              {booking.listing.title}
            </Link>
          </h2>
          <p className="text-red-400">{booking.listing.description}</p>
        </header>
        <footer className="flex flex-col sm:flex-row sm:text-center sm:items-center sm:gap-2 font-bold text-primary ">
          <span>{booking.startDate.toDateString()}</span>
          <span className="max-sm:hidden">-</span>
          <span>{booking.endDate.toDateString()}</span>
        </footer>
      </section>
      <TripCancel bookingId={booking.id} />
    </li>
  )
}
