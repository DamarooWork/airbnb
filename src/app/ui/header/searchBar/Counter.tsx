import { useSearchStore } from '@/store/SearchStore'
interface CountIconProps {
  icon: string
  onClick: () => void
}
export const CountIcon = ({ icon, onClick }: CountIconProps) => {
  return (
    <button
      className="border rounded-full w-8 h-8 flex items-center justify-center"
      onClick={onClick}
    >
      <span>{icon}</span>
    </button>
  )
}

interface CounterProps {
  label: string
}
export default function Counter({ label }: CounterProps) {
  const count = useSearchStore((state) => state.guests)
  const increaseCount = useSearchStore((state) => state.increaseGuests)
  const decreaseCount = useSearchStore((state) => state.decreaseGuests)

  return (
    <section className="flex justify-between items-center max-md:mt-2 text-base">
      <p className="font-bold">{label}</p>
      <div className="flex items-center gap-2">
        {count > 0 && <CountIcon icon="-" onClick={decreaseCount} />}
        <span className="block min-w-3.5">{count}</span>
        <CountIcon icon="+" onClick={increaseCount} />
      </div>
    </section>
  )
}
