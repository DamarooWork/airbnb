import { useSearchStore } from '@/store/SearchStore'
import { useState } from 'react'

export default function SearchInput() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const locationInput = useSearchStore((state) => state.location)
  return (
    <>
      <button
        className="border-r px-4 text-left"
        onClick={() => setIsSearchFocused(true)}
      >
        <p className="font-bold">Where</p>
        {isSearchFocused ? (
          <input
            className="text-slate-800 bg-transparent border-none outline-none"
            type="text"
            placeholder="Search destinations"
            value={locationInput}
            onChange={(e) =>
              useSearchStore.setState({ location: e.target.value })
            }
          />
        ) : (
          <p className="text-slate-600">Search destinations</p>
        )}
      </button>
    </>
  )
}
