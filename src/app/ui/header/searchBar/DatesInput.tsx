import SearchCalendar from './SearchCalendar'
import useGetPlaceholderDates from '@/hooks/useGetPlaceholderDates'

export default function DatesInput() {
  const dates = useGetPlaceholderDates()
  return (
    <section className="dropdown dropdown-end px-4 border-r ">
      <label tabIndex={1} htmlFor="">
        <p className="font-bold">Dates</p>
        <p className="text-slate-600">{dates}</p>
      </label>
      <div
        tabIndex={1}
        className="dropdown-content menu rounded-box  z-[100]  w-52 p-2 shadow"
      >
        <SearchCalendar definedRange={true} />
      </div>
    </section>
  )
}
