import Link from 'next/link'
import Counter from './Counter'
import CalendarComponent from './CalendarComponent'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchInput from './SearchInput'
import { useRouter } from 'next/navigation'
export default function SearchBar({
  toggleExpanded,
}: {
  toggleExpanded: () => void
}) {
  const router = useRouter()
  const handleSearchClick = () => {
    toggleExpanded()
    router.push('/search/results')
  }
  return (
    <section className="flex self-center rounded-full border p-2  ">
      <SearchInput />
      <section className="dropdown dropdown-end px-4 border-r">
        <label tabIndex={1} htmlFor="">
          <p className="font-bold">Dates</p>
          <p className="text-slate-600">Select Ranged</p>
        </label>
        <div
          tabIndex={1}
          className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow"
        >
          <CalendarComponent />
        </div>
      </section>
      <section className="dropdown dropdown-end px-4">
        <label tabIndex={2} htmlFor="">
          <p className="font-bold">Who</p>
          <p className="text-slate-600">Add Guests</p>
        </label>
        <div
          tabIndex={2}
          className="dropdown-content menu   rounded-box z-[1] w-52 p-2 shadow"
        >
          <Counter label="Adults" />
        </div>
      </section>

      <button
        onClick={handleSearchClick}
        className="px-4 text-white rounded-full bg-primary p-4 flex justify-center gap-3 items-center"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        <span>Search</span>
      </button>
    </section>
  )
}
