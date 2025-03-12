'use client'
import { useEffect, useState } from 'react'
import useFetchListings from './useFetchListings'
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
export interface useFetchProps {
  params: Object
}
export default function useGetListings(props: useFetchProps) {
  const [data, setData] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<Error | null>(null)
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const resp = await useFetchListings(props)
        if (isMounted) setData(resp)
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (isMounted) setIsError(new Error(`Unexpected error: ${e.message}`))
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  return { data, isLoading, isError }
}
