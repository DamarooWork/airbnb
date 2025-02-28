import { useSearchStore } from '@/store/SearchStore'
import CalendarComponent from './CalendarComponent'
import { useState } from 'react'

export default function DatesInput() {
  const [dateRangeLabel, setDateRangeLabel] = useState('Select dates')
  
  const handleSelect = (startDate: Date, endDate: Date) => {
    setDateRangeLabel(`${startDate.toDateString()} - ${endDate.toDateString()}`)
  }
  return (
    <section className="dropdown dropdown-end px-4 border-r ">
      <label tabIndex={1} htmlFor="">
        <p className="font-bold">Dates</p>
        <p className="text-slate-600">{dateRangeLabel}</p>
      </label>
      <div
        tabIndex={1}
        className="dropdown-content menu rounded-box z-[1]  w-52 p-2 shadow"
      >
        <CalendarComponent  handleSelect={handleSelect} definedRange={true} />
      </div>
    </section>
  )
}
