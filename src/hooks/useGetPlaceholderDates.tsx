import { useSearchStore } from '@/store/SearchStore'

export default function useGetPlaceholderDates() {
  const startDate = useSearchStore((state) => state.dates[0])
  const endDate = useSearchStore((state) => state.dates[1])
  return (
    <span className="cursor-pointer">
      {startDate.toDateString() === 'Thu Jan 01 1970' &&
      endDate.toDateString() === 'Thu Jan 01 1970' ? (
        'Any week'
      ) : (
        <span className="font-bold">
          {startDate.toDateString()} - {endDate.toDateString()}
        </span>
      )}
    </span>
  )
}
