import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import CollapseCard from './CollapseCard'
import { ReactNode, useState } from 'react'
import DestinationInput from './DestinationInput'
import { useSearchStore } from '@/store/SearchStore'
import DatesInput from './DatesInput'

export default function MobileNav() {
  const [currentTab, setCurrentTab] = useState(0)
  const location = useSearchStore((state) => state.location)
  const handleCurrentUpdate = (tabIndex: number) => {
    setCurrentTab(tabIndex)
  }

  const MobileMenu: { label: string; content?: ReactNode }[] = [
    { label: 'Where?', content: <DestinationInput /> },
    { label: 'When?', content: <DatesInput /> },
    { label: 'Who?' },
  ]
  return (
    <nav className="md:hidden flex-grow">
      <label
        htmlFor="my_modal_7"
        className="btn will-change-transform w-full flex justify-start  text-left rounded-full px-4 border-gray-100 items-center gap-4 drop-shadow-md bg-background hover:bg-slate-100 "
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <section>
          <h2 className="text-base text-foreground">
            {location ? location : 'Anywhere'}
          </h2>
          <section className="flex gap-2 text-gray-500 font-normal">
            <span>Any week</span>
            <span>|</span>
            <span>Add Guest</span>
          </section>
        </section>
      </label>
      {/*MODAL*/}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box bg-background">
          <ul className="pr-3">
            {MobileMenu.map((item, i: number) => {
              return (
                <CollapseCard
                  key={item.label}
                  isCurrent={currentTab === i ? true : false}
                  title={item.label}
                  index={i}
                  handleCurrentUpdate={handleCurrentUpdate}
                >
                  {item.content ? item.content : <p>Children</p>}
                </CollapseCard>
              )
            })}
          </ul>

          <label
            className="absolute right-4 top-4 btn-close cursor-pointer"
            htmlFor="my_modal_7"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </label>
          <footer className="flex pr-3 py-2 justify-between items-center">
            <button className="underline">Clear All</button>
            <button className="bg-primary px-4 py-2 rounded-md text-background flex justify-center items-center gap-2">
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Search</span>
            </button>
          </footer>
        </div>
        <label className="modal-backdrop cursor-pointer" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </nav>
  )
}
