import { Listing } from '@prisma/client'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import ImageListing from './ImageListing'
import updateListingImageUrl from '@/lib/actions/updateListingImageUrl'
import { revalidatePath } from 'next/cache'
import ListingDelete from './ListingDelete'
import { UTApi } from 'uploadthing/server'
interface CardProps {
  listing: Listing
}
export default function Card({ listing }: CardProps) {
  const previousImageKey = listing.image!.slice(28)

  const handleUpdateListingImageUrl = async (fileUrl: string) => {
    'use server'
    await updateListingImageUrl(fileUrl, listing.id)
    const utapi = new UTApi()
    await utapi.deleteFiles(previousImageKey)
    revalidatePath('/host/listing/')
  }
  return (
    <section className="flex flex-col gap-4 relative">
      <header>
        <h2 className="text-4xl font-bold">{listing?.title}</h2>
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
        <p>
          <span className="font-semibold underline">{listing.price}$</span>
          <span className="text-gray-600"> for 1 night</span>
        </p>
        <section className="flex gap-2  items-center">
          <StarIcon className="w-8 h-auto text-primary" />
          <p>{listing.rating || '0'}</p>
        </section>
        <section className="flex gap-2  items-center">
          <MapPinIcon className="w-8 h-auto text-primary" />
          <p>{listing.location || 'No info about location'}</p>
        </section>
      </section>
      <ListingDelete listingId={listing.id} />
    </section>
  )
}
