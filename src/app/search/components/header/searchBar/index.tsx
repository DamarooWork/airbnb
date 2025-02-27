import { useState } from 'react'
import Link from 'next/link'
import Counter from './counter'
import CalendarComponent from './CalendarComponent'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
export default function SearchBar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  return (
    <section className="flex self-center rounded-full border p-2 mt-8 ">
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
          />
        ) : (
          <p className="text-slate-600">Search destinations</p>
        )}
      </button>
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

      <Link
        href={'/search/results'}
        className="px-4 text-white rounded-full bg-primary p-4 flex justify-center gap-3 items-center"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        <span>Search</span>
      </Link>
    </section>
  )
}
