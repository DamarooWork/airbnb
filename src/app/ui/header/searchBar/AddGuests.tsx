import { useSearchStore } from '@/store/SearchStore'
import Counter from './Counter'

export default function AddGuests() {
  const count = useSearchStore((state) => state.guests)
  return (
    <section className="dropdown dropdown-hover px-4 ">
      <label className="" tabIndex={2} htmlFor="">
        <p className="font-bold">Who</p>
        <p className="text-slate-600 cursor-pointer min-w-24">
          {count && count !== 0 ? (
            count === 1 ? (
              <span className="font-bold"> {count} guest</span>
            ) : (
              <span className="font-bold">{count} guests</span>
            )
          ) : (
            'Add Guests'
          )}
        </p>
      </label>
      <div
        tabIndex={2}
        className="dropdown-content menu bg-background  rounded-xl z-[1] w-52 p-3  shadow -ml-2"
      >
        <Counter label="Adults" />
      </div>
    </section>
  )
}
