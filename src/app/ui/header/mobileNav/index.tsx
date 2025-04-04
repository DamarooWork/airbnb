import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'
import CollapseCard from './CollapseCard'
import { ReactNode, useState } from 'react'
import DestinationInput from './DestinationInput'
import { useSearchStore } from '@/store/SearchStore'
import DatesInput from './DatesInput'
import { useRouter } from 'next/navigation'
import useGetPlaceholderDates from '@/hooks/useGetPlaceholderDates'
import Counter from '../searchBar/Counter'

export default function MobileNav() {
  const [currentTab, setCurrentTab] = useState(0)
  const location = useSearchStore((state) => state.location)
  const guests = useSearchStore((state) => state.guests)
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  const removeAllFilters = useSearchStore((state) => state.removeAllFilters)
  const router = useRouter()
  const MobileMenu: { label: string; content: ReactNode }[] = [
    { label: 'Where?', content: <DestinationInput /> },
    { label: 'When?', content: <DatesInput /> },
    { label: 'Who?', content: <Counter label={'Adults'} /> },
  ]
  const handleSearchClick = () => {
    router.push(
      `/search/results?location=${location}&guests=${
        guests !== 0 ? guests : ''
      }&startdate=${startDate.toLocaleDateString()}&enddate=${endDate.toLocaleDateString()}`
    )
  }
  const dates = useGetPlaceholderDates()
  return (
    <section className="md:hidden flex-grow">
      <label
        htmlFor="my_modal_7"
        className="cursor-pointer active:scale-95 duration-100  transition-transform will-change-transform w-full flex justify-start  text-left rounded-3xl px-4 py-2 border-gray-100 items-center gap-4 drop-shadow-md bg-background hover:bg-slate-100 "
      >
        <MagnifyingGlassIcon className="min-w-5 min-h-5 size-8 text-primary" />
        <section>
          <h3
            className={`text-base text-foreground ${location && 'font-bold'}`}
          >
            {location ? location : 'Anywhere'}
          </h3>
          <section className="flex flex-col  text-gray-500 font-normal">
            <span className=" line-clamp-1">{dates}</span>
            <span
              className={`line-clamp-1 ${
                guests && guests !== 0 && 'font-bold'
              }`}
            >
              {guests && guests !== 0
                ? guests === 1
                  ? `${guests} guest`
                  : `${guests} guests`
                : 'Add Guests'}
            </span>
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
                  handleCurrentUpdate={() => setCurrentTab(i)}
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
            <button onClick={removeAllFilters} className="underline">
              Clear All
            </button>
            <label
              role="button"
              htmlFor="my_modal_7"
              onClick={handleSearchClick}
              className="bg-primary px-4 py-2 rounded-md text-background flex justify-center items-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <span>Search</span>
            </label>
          </footer>
        </div>
        <label className="modal-backdrop cursor-pointer" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </section>
  )
}
