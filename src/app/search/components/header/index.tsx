'use client'

import { useState } from 'react'
import SearchBar from './searchBar'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }
  return (
    <>
      <header
        className={`border-b bg-white z-50 sticky top-0 left-0 w-full flex justify-between items-center`}
      >
        <section
          className={`${
            isExpanded ? 'h-[9rem]' : 'h-[7.5rem]'
          }    flex justify-between items-center bg-transparent px-10 w-full`}
        >
          <Link href={'/'}>
            <Image
              src={'/images/logo.png'}
              height={50}
              width={172}
              alt="Airbnb logo"
            />
          </Link>

          {isExpanded ? (
            <SearchBar toggleExpanded={toggleExpanded}/>
          ) : (
            <button
              onClick={toggleExpanded}
              className={`search-container flex p-4 justify-center items-center rounded-full border drop-shadow-md bg-background ${
                isExpanded ? 'border-b-8' : 'border-b-0'
              } `}
            >
              <div className="flex justify-center items-center border-r px-4">
                <p>Anywhere</p>
              </div>
              <div className="flex justify-center items-center border-r px-4">
                <p>Any Date</p>
              </div>
              <div className="flex justify-center items-center border-r px-4">
                <p>Add Guests</p>
              </div>
              <div className="mx-4 search-btn px-4 rounded-full bg-primary h-10 w-10 relative ">
                <MagnifyingGlassIcon className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
              </div>
            </button>
          )}

          <section>
            <Image
              src={'/images/user.svg'}
              height={30}
              width={30}
              alt="user logo"
            />
          </section>
        </section>
      </header>
      <div
        onClick={() => setIsExpanded((prev) => !prev)}
        className={`${
          isExpanded ? 'block opacity-100' : 'hidden opacity-0'
        } absolute top-0 left-0 w-full h-full z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out`}
      ></div>
    </>
  )
}
