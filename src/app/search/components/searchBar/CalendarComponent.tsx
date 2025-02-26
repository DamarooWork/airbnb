import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker, RangeKeyDict, Range } from 'react-date-range'
import { useState } from 'react'

export default function CalendarComponent() {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  function handleSelect(ranges: RangeKeyDict) {
    if (ranges) {
      if (
        ranges.selection.startDate &&
        ranges.selection.startDate !== startDate
      ) {
        setStartDate(ranges.selection.startDate)
      }
      if (ranges.selection.endDate && ranges.selection.endDate !== endDate) {
        setEndDate(ranges.selection.endDate)
      }
    }
  }
  return <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
}
