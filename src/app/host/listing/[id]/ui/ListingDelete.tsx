'use client'
import actionDeleteListing from '@/lib/actions/deleteListing'
import DeleteConfirmationPopUp from '@/ui/DeleteConfirmationPopUp'
import { TrashIcon } from '@heroicons/react/24/solid'
import { redirect } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'react-toastify'

interface ListingDeleteProps {
  listingId: number
}
export default function ListingDelete({ listingId }: ListingDeleteProps) {
  const ref = useRef<{
    showConfirm: () => void
  }>(null)
  const handleListingDelete = async () => {
    let redirectPath: string | null = null
    await actionDeleteListing(listingId)
      .then(async () => {
        toast.success('The listing was successfully deleted!')
        redirectPath = '/host/listings'
      })
      .catch((e) => {
        console.log(e)
        toast.error('Some error...')
      })
      .finally(() => {
        if (redirectPath) redirect(redirectPath)
      })
  }
  const openConfirm = async () => {
    if (ref.current) ref.current.showConfirm()
  }
  return (
    <>
      <button
        title="Delete your listing"
        onClick={openConfirm}
        className="absolute top-0 right-0"
      >
        <TrashIcon className="size-10 text-primary hover:scale-110 transition-transform duration-300 ease-in-out will-change-transform active:scale-95" />
      </button>
      <DeleteConfirmationPopUp
        itemLabel="listing"
        onCancel={() => {}}
        onConfirm={handleListingDelete}
        ref={ref}
      />
    </>
  )
}
