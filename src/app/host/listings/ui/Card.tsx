'use client'
import { Prisma } from '@prisma/client'
import { imagePlaceholder } from '@/lib/constants/imagePlaceholder'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { listingSelect } from './List'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
interface CardProps {
  listing: Prisma.ListingGetPayload<{
    select: typeof listingSelect
  }>
  maxBookings: number
}
export default function Card({ listing, maxBookings }: CardProps) {
  const [image, setImage] = useState<string>(
    listing.image ? listing.image : imagePlaceholder
  )
  return (
    <li
      className="card shadow-gray-300 shadow-xl  text-xl transition-transform duration-300 ease-in-out group hover:scale-[1.01] will-change-transform "
      key={listing.id}
    >
      <Link
        href={`/host/listing/${listing.id}`}
        className="flex flex-col relative justify-between gap-4 p-4 aspect-square"
      >
        <Image
          className="object-cover transition-transform duration-300 transform group-hover:scale-[1.03] will-change-transform cursor-pointer -z-30 rounded-2xl opacity-90"
          onError={() => setImage(imagePlaceholder)}
          src={image}
          alt={listing.title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
        />
        <header className="p-1 text-white  w-fit rounded">
          <h2 className="font-bold drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
            {listing.title}
          </h2>
        </header>
        <footer className="flex flex-col gap-2">
          {listing.bookings.length > 0 ? (
            <section className="flex gap-2 text-white  w-fit p-1 rounded">
              {listing.bookings.length === maxBookings && (
                <ArrowTrendingUpIcon className="w-6 h-auto text-green-600 drop-shadow-[0_2px_5px_rgba(255,255,255,0.9)]" />
              )}
              <span className="drop-shadow-[0_1px_5px_rgba(0,0,0,0.9)]">
                Booked{' '}
                <span className="font-bold">{listing.bookings.length}</span>x
                times
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
