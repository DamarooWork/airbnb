import { useState } from 'react'

export default function SearchBar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  return (
    <section className="flex self-center rounded-full border p-2 mt-8 w-3/4">
      <button onClick={() => setIsSearchFocused(true)}>
        <p className="font-bold">Where</p>
        {isSearchFocused ? (
          <input
            className="text-slate-800 bg-transparent border-none outline-none"
            type="text"
            placeholder="Search destinations"
          />
        ) : (
          <p className="text-slate-600">Search destinations</p>
        )}
      </button>
      <section className="dropdown dropdown-end px-4 border-r">
        <label htmlFor="">
          <p className="font-bold">Dates</p>
          <p className="text-slate-600">Select Ranged</p>
        </label>
      </section>
      <section>
        <label htmlFor="">
          <p className="font-bold">Who</p>
          <p className="text-slate-600">Add Guests</p>
        </label>
      </section>
    </section>
  )
}
