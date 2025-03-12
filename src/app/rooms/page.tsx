'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RoomsPage() {
  const router = useRouter()
  useEffect(() => {
    router.push('/search')
  }, [])
  return <></>
}
