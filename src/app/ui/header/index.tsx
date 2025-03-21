'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import { usePathname } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useSearchStore } from '@/store/SearchStore'
import useGetPlaceholderDates from '@/hooks/useGetPlaceholderDates'
import SearchBar from './searchBar'
import Auth from '@/app/ui/header/auth'
import MobileNav from './mobileNav'
import Menu from './Menu'
import Logo from './Logo'

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef(null)
  const location = useSearchStore((state) => state.location)
  const count = useSearchStore((state) => state.guests)
  const dates = useGetPlaceholderDates()
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
      y: 125,
      scale: 2,
      display: 'none',
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
      display: 'none',
    },
    enter: {
      opacity: 1,
      height: 'auto',
      y: 0,
      scale: 1,
      display: 'flex',
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
        className={`border-b bg-white z-50 sticky top-0 left-0 w-full `}
      >
        <section
          className={`h-[7.5rem] flex justify-between items-center w-full gap-2 max-[1540px]:px-4 max-[1540px]:sm:px-10 ${
            pathname.includes('/search') || pathname.includes('/host/listings')
              ? 'px-4 sm:px-10'
              : 'max-w-[1500px] mx-auto'
          }     `}
        >
          <div className="max-md:hidden flex">
            <Logo/>
          </div>
          <section className="max-md:hidden flex flex-col justify-center items-center h-[8.5rem] flex-1 ">
            <motion.section
              className="flex justify-center items-center mx-auto   transition-transform duration-150 ease-in-out "
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
              className={` flex p-4 justify-center items-center rounded-full  border drop-shadow-md  mx-auto bg-background ${
                isExpanded ? 'border-b-8' : 'border-b-0'
              } `}
            >
              <div className="flex justify-center items-center border-r px-4 ">
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
          <Menu />
          <Auth />
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
