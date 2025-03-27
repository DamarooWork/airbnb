'use client'

import { useSearchStore } from '@/store/SearchStore'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface HandleSearchParamsProps {}
export default function HandleSearchParams({}: HandleSearchParamsProps) {
  const searchParams = useSearchParams()
  const location = searchParams.get('location')
  useEffect(() => {
    if (location) {
      useSearchStore.setState({ location: location as string })
    }
  }, [location])
  return <></>
}
