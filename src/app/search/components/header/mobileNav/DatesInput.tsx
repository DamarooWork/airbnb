import useGetPlaceholderDates from '@/hooks/useGetPlaceholderDates'
import CalendarComponent from '../searchBar/CalendarComponent'

export default function DatesInput() {
  const dates = useGetPlaceholderDates()
  return (
    <section>
      <p className="mb-2">{dates}</p>
      <CalendarComponent classNames={'w-full'} />
    </section>
  )
}
