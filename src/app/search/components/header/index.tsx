'use client'

import { useState } from 'react'
import SearchBar from '../searchBar'

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }
  return (
    <header className="container flex justify-between h-10 border-b bg-white z-50 sticky top-0 left-0 w-full">
      <section className="text-red-500">Airbnb</section>

      {isExpanded ? (
        <SearchBar />
      ) : (
        <button
          onClick={toggleExpanded}
          className="search-container flex gap-3 rounded-lg"
        >
          <div className="input border-r">
            <p>Anywhere</p>
          </div>
          <div className="input border-r">
            <p>Any Date</p>
          </div>
          <div className="input border-r">
            <p>Add Guests</p>
          </div>
          <div className="search-btn">Search</div>
        </button>
      )}

      <section>user</section>
    </header>
  )
}
