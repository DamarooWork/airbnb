'use client'
import actionDeleteBooking from '@/lib/actions/deleteBooking'
import DeleteConfirmationPopUp from '@/ui/DeleteConfirmationPopUp'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import { TrashIcon } from '@heroicons/react/24/solid'
interface TripCancelProps {
  bookingId: number
}

export default function TripCancel({ bookingId }: TripCancelProps) {
  const ref = useRef<{
    showConfirm: () => void
  }>(null)
  const handleBookingDelete = async () => {
    await actionDeleteBooking(bookingId)
      .then(async () => {
        toast.success('The booking was successfully deleted!')
      })
      .catch((e) => {
        console.log(e)
        toast.error('Some error...')
      })
  }
  const openConfirm = async () => {
    if (ref.current) ref.current.showConfirm()
  }
  return (
    <>
      <TrashIcon
        onClick={openConfirm}
        className="absolute size-8 bottom-2 sm:bottom-4 right-2 sm:right-4 cursor-pointer text-primary  hover:scale-110 transition-transform duration-300 ease-in-out will-change-transform active:scale-95"
      >
        Cancel Reservation
      </TrashIcon>
      <DeleteConfirmationPopUp
        itemLabel="booking"
        onConfirm={handleBookingDelete}
        ref={ref}
      />
    </>
  )
}
