import { Listing } from '@prisma/client'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import ImageListing from './ImageListing'
import updateListingImageUrl from '@/lib/actions/updateListingImageUrl'
import { revalidatePath } from 'next/cache'
interface CardProps {
  listing: Listing
}
export default function Card({ listing }: CardProps) {
  const handleUpdateListingImageUrl = async (fileUrl: string) => {
    'use server'
    await updateListingImageUrl(fileUrl, listing.id)
    revalidatePath('/host/listing/')
  }
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold">{listing?.title}</h1>
      </header>
      {listing.image && (
        <ImageListing
          updateListingImageUrl={handleUpdateListingImageUrl}
          imgUrl={listing.image}
          imgAlt={listing.title}
        />
      )}

      <section className="text-2xl">
        <p>{listing.description}</p>
        <p>Price - {listing.price}$ per day</p>
        <section className="flex gap-2  items-center">
          <StarIcon className="w-8 h-auto text-primary" />
          <p>{listing.rating || '0'}</p>
        </section>
        <section className="flex gap-2  items-center">
          <MapPinIcon className="w-8 h-auto text-primary" />
          <p>{listing.location || 'No info about location'}</p>
        </section>
      </section>
    </>
  )
}
