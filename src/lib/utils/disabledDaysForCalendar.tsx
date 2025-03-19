import { Prisma } from '@prisma/client'
import { format } from 'date-fns'

/* eslint-disable */
const listingSelect = {
  id: true,
  availabilities: true,
  bookings: true,
} satisfies Prisma.ListingSelect
/* eslint-enable */
type ListingPayload = Prisma.ListingGetPayload<{ select: typeof listingSelect }>

export function isDayBooked(day: Date, listing: ListingPayload) {
  return listing.bookings.some((booking) => {
    return day >= booking.startDate && day <= booking.endDate
  })
}
export function calculateDisabledDay(day: Date, listing: ListingPayload) {
  const isAvailable = listing.availabilities.some((availibility) => {
    return day >= availibility.startDate && day <= availibility.endDate
  })
  return !isAvailable || isDayBooked(day, listing)
}
export function customDayContent(
  day: Date,
  isBooked: (day: Date, listing: ListingPayload) => boolean,
  listing: ListingPayload
) {
  const dayClass = `${isDayBooked(day, listing) && 'line-throught'}`
  return (
    <div>
      <span className={dayClass}>{format(day, 'd')}</span>
    </div>
  )
}
