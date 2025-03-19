import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchInput from './SearchInput'
import { useRouter } from 'next/navigation'
import DatesInput from './DatesInput'
import AddGuests from './AddGuests'
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
    <section className="flex self-center rounded-full border p-2">
      <SearchInput />
      <DatesInput/>
      <AddGuests/>

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
