import { Listing } from '@prisma/client'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import ImageListing from './ImageListing'
import updateListingImageUrl from '@/lib/actions/updateListingImageUrl'
import { revalidatePath } from 'next/cache'
import ListingDelete from './ListingDelete'
import { UTApi } from 'uploadthing/server'
import UpdatingData from './UpdatingData'
import actionUpdateListingTitle from '@/lib/actions/updateListingTitle'
import actionUpdateListingDescription from '@/lib/actions/updateListingDescription'
import actionUpdateListingPrice from '@/lib/actions/updateListingPrice'
import actionUpdateListingLocation from '@/lib/actions/updateListingLocation'
import blurDataURL from '@/lib/utils/blurDataURL'
interface CardProps {
  listing: Listing
}
export default async function Card({ listing }: CardProps) {
  const { base64 } = await blurDataURL(listing.image)
  const previousImageKey = listing.image!.slice(28)
  const handleUpdateListingImageUrl = async (fileUrl: string) => {
    'use server'
    await updateListingImageUrl(fileUrl, listing.id)
    const utapi = new UTApi()
    await utapi.deleteFiles(previousImageKey)
    revalidatePath(`/host/listing/${listing.id}`, 'page')
  }
  const handleTitleUpdate = async (data: string) => {
    'use server'
    if (data !== listing.title) {
      await actionUpdateListingTitle(data, listing.id)
    }
    revalidatePath(`/host/listing/${listing.id}`, 'page')
  }
  const handleDescriptionUpdate = async (data: string) => {
    'use server'
    if (data !== listing.description) {
      await actionUpdateListingDescription(data, listing.id)
    }
    revalidatePath('/host/listing/')
  }
  const handlePriceUpdate = async (data: string) => {
    'use server'
    if (+data !== listing.price) {
      await actionUpdateListingPrice(data, listing.id)
    }
    revalidatePath('/host/listing/')
  }
  const handleLocationUpdate = async (data: string) => {
    'use server'
    if (data !== listing.location) {
      await actionUpdateListingLocation(data, listing.id)
    }
    revalidatePath('/host/listing/')
  }
  return (
    <article className="flex flex-col gap-4 relative">
      <header>
        <UpdatingData param={'Title'} action={handleTitleUpdate}>
          <h2 className="text-4xl font-bold">{listing.title}</h2>
        </UpdatingData>
      </header>
      <ImageListing
        base64={base64}
        updateListingImageUrl={handleUpdateListingImageUrl}
        imgUrl={listing.image}
        imgAlt={listing.title}
      />

      <section className="text-2xl flex flex-col gap-2">
        <UpdatingData param={'Description'} action={handleDescriptionUpdate}>
          <p>{listing.description}</p>
        </UpdatingData>
        <UpdatingData param={'Price'} action={handlePriceUpdate}>
          <p>
            <span className="font-semibold underline">{listing.price}$</span>
            <span className="text-gray-600"> for 1 night</span>
          </p>
        </UpdatingData>

        <section className="flex gap-2  items-center">
          <StarIcon className="w-8 h-auto text-primary" />
          <p>{listing.rating || '0'}</p>
        </section>
        <UpdatingData param={'Location'} action={handleLocationUpdate}>
          <section className="flex gap-2  items-center">
            <MapPinIcon className="w-8 h-auto text-primary" />
            <p>{listing.location || 'No info about location'}</p>
          </section>
        </UpdatingData>
      </section>
      <ListingDelete listingId={listing.id} />
    </article>
  )
}
