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
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

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
      })
    )
  }
  return (
    <section className="flex flex-col gap-2 mt-4">
      <h3 className="text-3xl text-slate-800">Select dates for booking now!</h3>
      <DateRangePicker
        minDate={new Date()}
        onChange={handleSelect}
        ranges={[selectionRange]}
        rangeColors={['#FF385C', '#f7D267', '#3E92CC']}
        disabledDay={(day) => calculateDisabledDay(day, listing)}
        dayContentRenderer={(day) =>
          customDayContent(day, isDayBooked, listing)
        }
      />
      {isBookingDisabled && (
        <p className="text-red-500 my-2">
          The date selection is required before proceeding
        </p>
      )}
      {isPending ? (
        <Loader size={25} />
      ) : (
        <button
          disabled={isBookingDisabled}
          className="btn btn-primary text-black disabled:text-gray-400 self-start"
          onClick={handleSubmitBooking}
        >
          Submit Booking
        </button>
      )}
    </section>
  )
}
