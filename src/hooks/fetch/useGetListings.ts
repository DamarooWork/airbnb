'use client'
import { memo, useEffect, useState } from 'react'
import FetchListings from './FetchListings'
export interface Listing {
  id: number
  title: string
  description: string | null
  published: boolean
  ownerId: number
  image: string | null
  price: number
  rating: number | null
  location: string | null
}
export interface FetchProps {
  params: object
}
function useGetListings({ params }: FetchProps) {
  const [data, setData] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<Error | null>(null)
  useEffect(() => {
    let isMounted = true
    const getData = async () => {
      setIsLoading(true)
      try {
        const resp = await FetchListings({ params })
        if (isMounted) setData(resp)
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (isMounted) setIsError(new Error(`Unexpected error: ${e.message}`))
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    getData()
    return () => {
      isMounted = false
    }
  }, [params])

  return { data, isLoading, isError }
}

export default useGetListings