import { useSearchStore } from '@/store/SearchStore'
import Counter from './Counter'

export default function AddGuests() {
  const count = useSearchStore((state) => state.guests)
  return (
    <section className="dropdown dropdown-end px-4 ">
      <label className="" tabIndex={2} htmlFor="">
        <p className="font-bold">Who</p>
        <p className="text-slate-600 cursor-pointer">
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
        className="dropdown-content menu bg-background  rounded-box z-[1] w-52 p-2 shadow"
      >
        <Counter label="Adults" />
      </div>
    </section>
  )
}
