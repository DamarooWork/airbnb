import { useState } from 'react'
interface CountIconProps {
  icon: string
  onClick: () => void
}
export const CountIcon = ({ icon, onClick }: CountIconProps) => {
  return (
    <button
      className="border rounded-full w-5 h-5 flex items-center justify-center"
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
  const [count, setCount] = useState(0)
  return (
    <>
      <section className="flex justify-between">
        <p className="font-bold">{label}</p>
        <div className="flex items-center gap-x-1">
          {count > 0 && (
            <CountIcon icon="-" onClick={() => setCount((prev) => prev - 1)} />
          )}
          <span>{count}</span>
          <CountIcon icon="+" onClick={() => setCount((prev) => prev + 1)} />
        </div>
      </section>
    </>
  )
}
