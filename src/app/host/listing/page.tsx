'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NoIdListingPage() {
  const router = useRouter()
  router.push('/host/listings')
  return <></>
}
