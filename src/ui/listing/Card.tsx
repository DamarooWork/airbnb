import { StarIcon } from '@heroicons/react/24/solid'
import { FavoriteListing, Listing } from '@prisma/client'
import Link from 'next/link'
import ImageForCard from './ImageForCard'
import HeartBtn from './HeartBtn'
import { prisma } from '../../../db/prisma'
import { auth } from '@clerk/nextjs/server'

export default async function Card({ listing }: { listing: Listing }) {
  const { userId } = await auth()
  let isFav: FavoriteListing | null = null
  if (userId) {
    isFav = await prisma.favoriteListing.findFirst({
      where: {
        userId,
        listingId: listing.id,
      },
    })
  }

  return (
    <li className="w-full overflow-hidden group relative">
      <Link
        title={listing.title}
        aria-label={listing.title}
        className="relative block w-full aspect-square overflow-hidden rounded-3xl"
        href={`/rooms/${listing.id}`}
      >
        <ImageForCard imgAlt={listing.title} imgUrl={listing.image} />
      </Link>
      <Link
        title={listing.title}
        aria-label={listing.title}
        href={`/rooms/${listing.id}`}
        className="pt-4 cursor-pointer block"
      >
        <header className="flex items-center justify-between text-xl leading-6">
          <h3 className="font-semibold max-w-[90%] overflow-hidden whitespace-nowrap overflow-ellipsis">
            {listing.title}
          </h3>
          <section className="flex gap-1 items-center ">
            <StarIcon className="h-5 w-5 text-primary" />
            <span className=" text-gray-800 ">
              {listing.rating ? listing.rating : 0}
            </span>
          </section>
        </header>

        <footer className="flex flex-col justify-between text-sm">
          <p className="text-gray-600 overflow-hidden whitespace-nowrap overflow-ellipsis">
            {listing.description}
          </p>
          <p className="font-semibold">{listing.location}</p>
          <p className="text-base">
            <span className="font-semibold underline">{listing.price}$</span>
            <span className="text-gray-500"> for 1 night</span>
          </p>
        </footer>
      </Link>
      <HeartBtn isFavorite={isFav} listingId={listing.id} />
    </li>
  )
}
