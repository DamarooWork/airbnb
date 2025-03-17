import useGetPlaceholderDates from '@/hooks/useGetPlaceholderDates'
import SearchCalendar from '../searchBar/SearchCalendar'

export default function DatesInput() {
  const dates = useGetPlaceholderDates()
  return (
    <section>
      <p className="mb-2">{dates}</p>
      <SearchCalendar classNames={'w-full'} />
    </section>
  )
}
