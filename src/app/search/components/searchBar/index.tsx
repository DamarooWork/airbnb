import { useState } from 'react'

export default function SearchBar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  return (
    <section className="flex self-center rounded-full border p-2 mt-8 w-3/4">
      <button onClick={() => setIsSearchFocused(true)}>
        {isSearchFocused ? (
          <input type="text" placeholder="Search destinations" />
        ) : (
          <p>Search destinations</p>
        )}
      </button>
      <section>
        <label htmlFor="">
          <p>Dates</p>
          <p>Select Ranged</p>
        </label>
      </section>
      <section>
        <label htmlFor="">
          <p>Who</p>
          <p>Add Guests</p>
        </label>
      </section>
    </section>
  )
}
