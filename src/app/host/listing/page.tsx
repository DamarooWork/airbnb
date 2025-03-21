'use client'
import Loader from '@/ui/Loader'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NoIdListingPage() {
  const router = useRouter()
  useEffect(() => {
    router.push('/host/listings')
  }, [])
  return <Loader size={100} />
}
