'use client'
import { IListing } from '@/app/api/search/route'
import { useEffect, useState } from 'react'
import getDataFromFetch from './getDataFromFetch'

export default function useFetch() {
  const [data, setData] = useState<IListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string>('')
  useEffect(() => {
    const fetchAData = async () => {
      try {
        setIsLoading(true)
        const json = await getDataFromFetch()
        setData(json)
      } catch (e) {
        setIsError('An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    fetchAData()
  }, [])

  return { data, isLoading, isError }
}
