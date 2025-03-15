import { auth } from '@clerk/nextjs/server'
import { prisma } from '../../../../../db/prisma'
import { notFound, useParams } from 'next/navigation'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Calendar from './ui/Calendar'
export default async function ListingPage({
  params,
}: {
  params: {
    id: string
  }
}) {
  const { userId } = await auth()
  const listing = await prisma.listing.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: { availabilities: true },
  })

  if (listing?.ownerId !== userId) {
    notFound()
  }
  return (
    <section
    // style={{ '--image-url': `url(${listing.image})` } as React.CSSProperties}
    // className="bg-[image:var(--image-url)]"
    >
      {listing.image && (
        <Image
          className=" object-cover w-full max-h-[300px] rounded-2xl "
          src={listing.image}
          alt={listing.title}
          width={500}
          height={500}
        />
      )}

      <header className="mt-4">
        <h1>{listing?.title}</h1>
      </header>
      <section>
        <p>{listing.description}</p>
        <p>{listing.price}$ per day</p>
        {listing.rating && (
          <section className="flex gap-2  items-center">
            <StarIcon className="w-5 h-auto text-primary" />
            <p>{listing.rating}</p>
          </section>
        )}

        <section className="flex gap-2  items-center">
          <MapPinIcon className="w-5 h-auto text-primary" />
          <p>{listing.location}</p>
        </section>
        <Calendar listing={listing} />
      </section>
    </section>
  )
}
