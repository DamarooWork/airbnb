'use client'
import { Prisma } from '@prisma/client'
import { bookingSelect } from './List'
import Image from 'next/image'
import { useState } from 'react'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'

interface CardProps {
  booking: Prisma.BookingGetPayload<{ select: typeof bookingSelect }>
}
export default function Card({ booking }: CardProps) {
  const [image, setImage] = useState<string>(
    booking.listing.image ? booking.listing.image : imagePlaceholder
  )
  return (
    <li className="card h-48 shadow-md hover:shadow-xl flex flex-row  cursor-pointer transition-shadow duration-300 ease-in-out">
      <div className="relative w-32 min-w-32 sm:w-48 sm:min-w-48 aspect-square">
        <Image
          className="object-cover rounded-l-2xl"
          onError={() => setImage(imagePlaceholder)}
          src={image}
          alt={booking.listing.title}
          fill
          priority
          sizes="(max-width: 768px) 128px 128px, 192px 192px"
        />
      </div>
      <section className="flex flex-col justify-between p-4">
        <header className="text-xl">
          <h2 className="font-semibold text-primary">
            {booking.listing.title}
          </h2>
          <p className="text-red-400">{booking.listing.description}</p>
        </header>
        <footer className="flex flex-row gap-2 font-bold text-primary">
          <span>{booking.startDate.toDateString()}</span>
          <span>-</span>
          <span>{booking.endDate.toDateString()}</span>
        </footer>
      </section>
    </li>
  )
}
