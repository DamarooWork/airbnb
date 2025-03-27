'use client'
import actionCreateUserBooking from '@/lib/actions/createUserBooking'
import {
  isDayBooked,
  calculateDisabledDay,
  customDayContent,
} from '@/lib/utils/disabledDaysForCalendar'
import Loader from '@/ui/Loader'
import { Prisma } from '@prisma/client'
import { addDays } from 'date-fns'
import { useState, useTransition } from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { toast } from 'react-toastify'

/* eslint-disable */
const listingSelect = {
  id: true,
  availabilities: true,
  bookings: true,
} satisfies Prisma.ListingSelect
/* eslint-enable */
type ListingPayload = Prisma.ListingGetPayload<{ select: typeof listingSelect }>

interface CalendarProps {
  listing: ListingPayload
  userId: string
}

export default function BookingCalendar({ listing, userId }: CalendarProps) {
  const [isBookingDisabled, setIsBookingDisabled] = useState<boolean>(true)
  const [isPending, startTransition] = useTransition()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 3))
  const handleSelect = (ranges: RangeKeyDict) => {
    if (isBookingDisabled) {
      setIsBookingDisabled(false)
    }
    if (ranges.selection.startDate && ranges.selection.startDate !== startDate)
      setStartDate(ranges.selection.startDate)

    if (ranges.selection.endDate && ranges.selection.endDate !== endDate)
      setEndDate(ranges.selection.endDate)
  }
  const selectionRange: Range = {
    startDate,
    endDate,
    key: 'selection',
  }

  const handleSubmitBooking = () => {
    startTransition(() =>
      actionCreateUserBooking({
        listingId: listing.id,
        startDate,
        endDate,
        userId,
      }).then(() => {
        setStartDate(new Date())
        setEndDate(addDays(new Date(), 3))
        setIsBookingDisabled(true)
        toast.success('Booking successful!')
      })
    )
  }
  return (
    <section className="flex flex-col gap-2 mt-4">
      <h3 className="text-3xl text-slate-800">Select dates for booking now!</h3>
      <DateRange
        minDate={new Date()}
        onChange={handleSelect}
        ranges={[selectionRange]}
        rangeColors={['#FF385C', '#f7D267', '#3E92CC']}
        disabledDay={(day) => calculateDisabledDay(day, listing)}
        dayContentRenderer={(day) =>
          customDayContent(day, isDayBooked, listing)
        }
        className="max-w-[450px]"
      />
      {isBookingDisabled && (
        <p className="text-red-500 my-2 font-semibold">
          The date selection is required before proceeding
        </p>
      )}
      {isPending ? (
        <Loader size={25} />
      ) : (
        <button
          disabled={isBookingDisabled}
          className="bg-red-100 hover:bg-red-200 active:bg-red-300 transition-colors duration-300 ease-in-out text-primary outline-none border-[1px] border-red-300 rounded-lg  disabled:opacity-50 disabled:bg-red-100 font-bold py-2 px-4 self-start"
          onClick={handleSubmitBooking}
        >
          Submit Booking
        </button>
      )}
    </section>
  )
}
