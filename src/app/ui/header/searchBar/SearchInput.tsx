import { useSearchStore } from '@/store/SearchStore'

export default function SearchInput() {
  const locationInput = useSearchStore((state) => state.location)
  return (
    <>
      <section className="flex flex-col justify-center  border-r px-4 text-left">
        <p className="font-bold">Where</p>
        <input
          className="text-slate-600 font-semibold bg-transparent border-none outline-none"
          type="text"
          placeholder="Search destinations"
          value={locationInput}
          onChange={(e) =>
            useSearchStore.setState({ location: e.target.value })
          }
        />
      </section>
    </>
  )
}
