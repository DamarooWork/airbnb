import { useSearchStore } from '@/store/SearchStore'

export default function useGetPlaceholderDates() {
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  return (
    <span className="cursor-pointer">
      {startDate.toLocaleDateString() === '25.03.2025' &&
      endDate.toLocaleDateString() === '25.04.2026' ? (
        'Any week'
      ) : (
        <span className="font-bold">
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </span>
      )}
    </span>
  )
}
