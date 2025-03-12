'use client'
import { useEffect, useState } from 'react'
import { prisma } from '../../../../db/prisma'
export interface PrismaListing {
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
export default function useFetch() {
  const [data, setData] = useState<PrismaListing[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string>('')
  useEffect(() => {
    const fetchAData = async () => {
      try {
        setIsLoading(true)
        const resp = await prisma.listing.findMany()
        console.log(resp)
        setData(resp)
      } catch (e) {
        setIsError('An error occurred' + e)
      }
      setIsLoading(false)
    }
    fetchAData()
  }, [])

  return { data, isLoading, isError }
}
