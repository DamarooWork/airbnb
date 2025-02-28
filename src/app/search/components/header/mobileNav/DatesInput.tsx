import { useState } from 'react'
import CalendarComponent from '../searchBar/CalendarComponent'

export default function DatesInput() {
  const [dateRangeLabel, setDateRangeLabel] = useState('Select dates')
  const handleSelect = (startDate: Date, endDate: Date) => {
    setDateRangeLabel(`${startDate.toDateString()} - ${endDate.toDateString()}`)
  }
  return (
    <section>
      <p className="mb-2">{dateRangeLabel}</p>
      <CalendarComponent classNames={'w-full'} handleSelect={handleSelect} />
    </section>
  )
}
