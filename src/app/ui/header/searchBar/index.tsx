import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchInput from './SearchInput'
import { useRouter } from 'next/navigation'
import DatesInput from './DatesInput'
import AddGuests from './AddGuests'
import { useSearchStore } from '@/store/SearchStore'
export default function SearchBar({
  toggleExpanded,
}: {
  toggleExpanded: () => void
}) {
  const router = useRouter()
  const location = useSearchStore((state) => state.location)
  const guests = useSearchStore((state) => state.guests)
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  const handleSearchClick = () => {
    toggleExpanded()
    router.push(
      `/search/results?location=${location}&guests=${guests}&startdate=${startDate.toLocaleDateString()}&enddate=${endDate.toLocaleDateString()}`
    )
  }
  return (
    <section className="flex self-center rounded-full border p-2 drop-shadow-md  bg-background">
      <SearchInput />
      <DatesInput />
      <AddGuests />

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
