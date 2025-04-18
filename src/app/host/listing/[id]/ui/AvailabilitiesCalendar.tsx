'use client'
import actionSubmitBookingDates from '@/lib/actions/submitBookingDates'
import {
  customDayContent,
  isDayBooked,
} from '@/lib/utils/disabledDaysForCalendar'
import Loader from '@/ui/loaders/Loader'
import { Prisma } from '@prisma/client'
import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRange, Range } from 'react-date-range'
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
}
export type DateRangeSelection = {
  selection1: Range
  selection2: Range
  selection3: Range
}

const defaultDateRange = {
  selection1: {
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 1),
    key: 'selection1',
  },
  selection2: {
    startDate: addDays(new Date(), 4),
    endDate: addDays(new Date(), 8),
    key: 'selection2',
  },
  selection3: {
    startDate: addDays(new Date(), 8),
    endDate: addDays(new Date(), 10),
    key: 'selection3',
    autofocus: false,
  },
}
export default function AvailabilitiesCalendar({ listing }: CalendarProps) {
  const [showModal, setShowModal] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const initialDateRange =
    listing.availabilities && listing.availabilities.length > 0
      ? {
          ...defaultDateRange,
          selection1: {
            ...defaultDateRange.selection1,
            startDate:
              listing.availabilities[0].startDate ||
              defaultDateRange.selection1.startDate,
            endDate:
              listing.availabilities[0].endDate ||
              defaultDateRange.selection1.endDate,
          },
          selection2: {
            ...defaultDateRange.selection2,
            startDate:
              listing.availabilities[1].startDate ||
              defaultDateRange.selection2.startDate,
            endDate:
              listing.availabilities[1].endDate ||
              defaultDateRange.selection2.endDate,
          },
          selection3: {
            ...defaultDateRange.selection3,
            startDate:
              listing.availabilities[2].startDate ||
              defaultDateRange.selection3.startDate,
            endDate:
              listing.availabilities[2].endDate ||
              defaultDateRange.selection3.endDate,
          },
        }
      : defaultDateRange
  const [state, setState] = useState<DateRangeSelection>(initialDateRange)

  const handleSubmitChanges = async () => {
    const dateRanges = Object.values(state).map((range) => {
      return {
        startDate: range.startDate,
        endDate: range.endDate,
      }
    })
    setDisabled(true)
    await actionSubmitBookingDates(listing.id, dateRanges)
    setDisabled(false)
    setShowModal(false)
    toast.success('Availabilities updated!')
  }

  return (
    <section className="text-xl">
      <h2>Available Dates:</h2>
      {!listing.availabilities || listing.availabilities.length === 0 ? (
        <>
          <p className="text-gray-600">No Available Dates</p>
          <button
            title="Add dates"
            className="btn btn-error bg-primary text-white  mt-2"
            onClick={() => setShowModal(true)}
          >
            Add Availability
          </button>
          <input
            type="checkbox"
            checked={showModal}
            onChange={() => setShowModal((prev) => !prev)}
            id="calendar-modal"
            className="modal-toggle"
          />
        </>
      ) : (
        <>
          <ul>
            {listing.availabilities.map((aval) => (
              <li key={aval.id} className="flex gap-2">
                <span>{aval.startDate.toDateString()}</span>
                <span>-</span>
                <span>{aval.endDate.toDateString()}</span>
              </li>
            ))}
          </ul>
          <button
            title="Edit dates"
            className="btn btn-error bg-primary text-white  mt-4"
            onClick={() => setShowModal(true)}
          >
            Edit Availability
          </button>
          <input
            type="checkbox"
            checked={showModal}
            onChange={() => setShowModal((prev) => !prev)}
            id="calendar-modal"
            className="modal-toggle"
          />
        </>
      )}
      <section className="modal">
        <div className="modal-box bg-white max-w-lg  flex flex-col items-center ">
          <h3 className="text-2xl font-bold">Please, select the dates</h3>
          <p className="text-primary py-2 italic">
            Please note you can select up to 3 ranges
          </p>

          <DateRange
            minDate={new Date()}
            onChange={(item) => setState({ ...state, ...item })}
            ranges={[state.selection1, state.selection2, state.selection3]}
            rangeColors={['#FF385C', '#f7D267', '#3E92CC']}
            disabledDay={(day) => isDayBooked(day, listing)}
            dayContentRenderer={(day) =>
              customDayContent(day, isDayBooked, listing)
            }
          />

          <footer className="flex items-center justify-between mt-4 w-full px-2">
            {disabled ? (
              <Loader size={30} />
            ) : (
              <button
                title="Save availabilities"
                onClick={handleSubmitChanges}
                className="btn btn-success text-white  will-change-transform"
                disabled={disabled}
              >
                Save Changes
              </button>
            )}
            <button
              title="Close"
              onClick={() => setShowModal(false)}
              className="btn btn-error text-white  will-change-transform"
              disabled={disabled}
            >
              Cancel
            </button>
          </footer>
        </div>
        <label
          title="Close"
          className="modal-backdrop cursor-pointer"
          htmlFor="calendar-modal"
        >
          Close
        </label>
      </section>
    </section>
  )
}
