'use client'

import { useRef, useState } from 'react'
import SearchBar from './searchBar'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import MobileNav from './mobileNav'
import { useSearchStore } from '@/store/SearchStore'
import getPlaceholderDates from '@/lib/utils/getPlaceholderDates'

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false)
  const headerRef = useRef(null)
  const location = useSearchStore((state) => state.location)
  const count = useSearchStore((state) => state.guests)
  const dates = getPlaceholderDates()
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev)
  }
  useClickAway(headerRef, () => {
    if (isExpanded) {
      toggleExpanded()
    }
  })
  const searchContainerVariants = {
    initial: {
      opacity: 1,
      height: 'auto',
      y: 0,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      height: 0,
      y: 100,
      scale: 2,
    },
    enter: {
      opacity: 1,
      height: 'auto',
      y: 0,
      scale: 1,
    },
  }
  const tabVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -100,
      scale: 0,
    },
    enter: {
      opacity: 1,
      height: 'auto',
      y: 25,
      scale: 1,
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -100,
      scale: 0,
    },
  }
  return (
    <>
      <header
        ref={headerRef}
        className={`border-b bg-white z-50 sticky top-0 left-0 w-full flex justify-between items-center`}
      >
        <section
          className={` h-[7.5rem]   flex justify-between items-center bg-transparent px-10 w-full`}
        >
          <Link className="hidden md:flex" href={'/'}>
            <Image
              className="w-[172px] h-auto"
              src={'/images/logo.png'}
              height={50}
              width={172}
              alt="Airbnb logo"
            />
          </Link>

          <section className="hidden md:flex flex-col">
            <motion.section
              className="flex justify-center items-center"
              initial="hidden"
              animate={isExpanded ? 'enter' : 'exit'}
              exit="exit"
              transition={{ type: 'linear' }}
              variants={tabVariants}
            >
              <SearchBar toggleExpanded={toggleExpanded} />
            </motion.section>

            <motion.button
              initial="initial"
              animate={isExpanded ? 'hidden' : 'enter'}
              exit="exit"
              transition={{ type: 'linear' }}
              onClick={toggleExpanded}
              variants={searchContainerVariants}
              className={` flex p-4 justify-center items-center rounded-full  border drop-shadow-md bg-background ${
                isExpanded ? 'border-b-8' : 'border-b-0'
              } `}
            >
              <div className="flex justify-center items-center border-r px-4">
                <p>
                  {location ? (
                    <span className="font-bold"> {location}</span>
                  ) : (
                    'Anywhere'
                  )}
                </p>
              </div>
              <div className="flex justify-center items-center border-r px-4">
                <p>{dates}</p>
              </div>
              <div className="flex justify-center items-center border-r px-4">
                <p>
                  {count && count !== 0 ? (
                    count === 1 ? (
                      <span className="font-bold">{count} guest</span>
                    ) : (
                      <span className="font-bold">{count} guests</span>
                    )
                  ) : (
                    'Add Guests'
                  )}
                </p>
              </div>
              <div className="mx-4 search-btn px-4 rounded-full bg-primary h-10 w-10 relative ">
                <MagnifyingGlassIcon className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
              </div>
            </motion.button>
          </section>
          <MobileNav />
          <section className="ml-4">
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
        className={`${
          isExpanded ? 'block opacity-100' : 'hidden opacity-0'
        } fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out`}
      ></div>
    </>
  )
}
