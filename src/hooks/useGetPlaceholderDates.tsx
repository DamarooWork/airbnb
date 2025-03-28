import { useSearchStore } from '@/store/SearchStore'
import { usePathname } from 'next/navigation'

export default function useGetPlaceholderDates() {
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  const pathname = usePathname()
  return (
    <span className="cursor-pointer">
      {startDate.toLocaleDateString() === '25.03.2025' &&
      endDate.toLocaleDateString() === '25.04.2026' &&
      pathname !== '/search/results' ? (
        'Any week'
      ) : (
        <span className="font-bold">
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </span>
      )}
    </span>
  )
}
