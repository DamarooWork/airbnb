import { useSearchStore } from '@/store/SearchStore'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
export default function DestinationInput() {
   const locationInput = useSearchStore((state) => state.location)
  return (
    <section className="relative mt-2">
      <MagnifyingGlassIcon className="absolute top-3 left-2 w-5 h-5 text-gray-400" />
      <input
        className="bg-background border-gray-400 text-gray-800 border-[1px] rounded-lg h-12 pl-8 pr-2 outline-none flex justify-start items-center w-full"
        type="text"
        value={locationInput}
        onChange={(e) =>
          useSearchStore.setState({ location: e.target.value })
        }
        placeholder="Where are you going?"
      />
    </section>
  )
}
