'use client'
import ListingList from '../../../ui/listing/List'
import useGetListings from '@/hooks/fetch/useGetListings'
import { useMemo } from 'react'
import { useSearchStore } from '@/store/SearchStore'
import { useSearchParams } from 'next/navigation'

export default function ResultsPage() {
  const params = useSearchParams()

  const fetchParams = useMemo(() => {
    if (params.get('location'))
      return {
        orderBy: {
          id: 'desc',
        },
        where: {
          OR: [
            {
              title: {
                search: params.get('location'),
              },
            },
            {
              description: {
                search: params.get('location'),
              },
            },
          ],
        },
      }
    return {
      orderBy: {
        id: 'desc',
      },
    }
  }, [params])
  const { data, isLoading, isError } = useGetListings({
    params: fetchParams,
  })
  const location = useSearchStore((state) => state.location)
  // const [filteredData, setFilteredData] = useState<Listing[]>([])

  // const filterData = useCallback(() => {
  //   setFilteredData(
  //     data.filter((list) =>
  //       list.title.toLowerCase().includes(location.toLowerCase())
  //     )
  //   )
  // }, [data, location])
  // const [isReady] = useDebounce(filterData, 800, [location, data])
  // useEffect(() => {
  //   if (isReady()) {
  //     filterData()
  //   }
  // }, [isReady, filterData])

  return (
    <section>
      <section className="flex items-center justify-start w-full h-24 ">
        <h1 className="text-4xl font-bold text-primary">Search results:</h1>
      </section>
      <ListingList data={data} isLoading={isLoading} isError={isError} />
    </section>
  )
}
