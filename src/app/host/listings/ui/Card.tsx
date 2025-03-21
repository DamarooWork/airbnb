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
      className="card aspect-square justify-between gap-4 shadow-gray-300 shadow-xl p-4 text-xl transition-transform duration-300 ease-in-out group hover:scale-[1.01] will-change-transform "
      key={listing.id}
    >
      <Image
        className="object-cover transition-transform duration-300 transform group-hover:scale-[1.03] will-change-transform cursor-pointer -z-30 rounded-2xl opacity-90"
        onError={() => setImage(imagePlaceholder)}
        src={image}
        alt={listing.title}
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536) 25vw, 20vw"
      />
      <Link
        className="hover:underline p-1 text-black bg-white/80 w-fit rounded"
        href={`/rooms/${listing.id}`}
      >
        <h2 className="font-bold">{listing.title}</h2>
        <p className="text-gray-600">{listing.description}</p>
      </Link>
      <footer className="flex flex-col gap-2">
        {listing.bookings.length > 0 ? (
          <section className="flex gap-2 text-black bg-white/80 w-fit p-1 rounded">
            {listing.bookings.length === maxBookings && (
              <ArrowTrendingUpIcon className="w-6 h-auto text-green-600 " />
            )}
            <span>Booked {listing.bookings.length}x times</span>
          </section>
        ) : (
          <p className="text-gray-500 bg-white/80 w-fit p-1">No bookings yet</p>
        )}
        <Link
          className="hover:underline p-1 text-black bg-white/80 w-fit rounded"
          href={`/host/listing/${listing.id}`}
        >
          Edit the listing
        </Link>
      </footer>
    </li>
  )
}
