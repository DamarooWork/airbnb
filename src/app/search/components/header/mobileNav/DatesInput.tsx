import getPlaceholderDates from '@/lib/utils/getPlaceholderDates'
import CalendarComponent from '../searchBar/CalendarComponent'

export default function DatesInput() {
  const dates = getPlaceholderDates()
  return (
    <section>
      <p className="mb-2">
      {dates}
      </p>
      <CalendarComponent classNames={'w-full'} />
    </section>
  )
}
