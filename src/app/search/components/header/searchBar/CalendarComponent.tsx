import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker, RangeKeyDict } from 'react-date-range'
import { useState } from 'react'
import { useSearchStore } from '@/store/SearchStore'

export default function CalendarComponent({handleSelect}:{handleSelect: (startDate: Date, endDate: Date)=>void}) {
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  function handleSelectCalendar(ranges: RangeKeyDict) {
    if (ranges.selection.startDate && ranges.selection.endDate) {
      useSearchStore.setState({
        dates: [ranges.selection.startDate, ranges.selection.endDate],
      })
      handleSelect(ranges.selection.startDate, ranges.selection.endDate)
    }
   
  }
  return (
    <DateRangePicker
      rangeColors={['#FF385C']}
      minDate={new Date()}
      ranges={[selectionRange]}
      onChange={handleSelectCalendar}
    />
  )
}
