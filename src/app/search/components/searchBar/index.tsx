import { useState } from 'react'
import Counter from '../counter'

export default function SearchBar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  return (
    <section className="flex self-center rounded-full border p-2 mt-8 w-3/4">
      <button onClick={() => setIsSearchFocused(true)}>
        <p className="font-bold">Where</p>
        {isSearchFocused ? (
          <input
            className="text-slate-100 bg-transparent border-none outline-none"
            type="text"
            placeholder="Search destinations"
          />
        ) : (
          <p className="text-slate-200">Search destinations</p>
        )}
      </button>
      <section className="dropdown dropdown-end px-4 border-r">
        <label tabIndex={1} htmlFor="">
          <p className="font-bold">Dates</p>
          <p className="text-slate-200">Select Ranged</p>
        </label>
        <div
          tabIndex={1}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <p>Range Selector</p>
        </div>
      </section>
      <section className="dropdown dropdown-end px-4">
        <label tabIndex={2} htmlFor="">
          <p className="font-bold">Who</p>
          <p className="text-slate-200">Add Guests</p>
        </label>
        <div
          tabIndex={2}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <Counter label={'label'} />
        </div>
      </section>
    </section>
  )
}
