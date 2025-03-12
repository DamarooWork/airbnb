'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface pageProps {}
export default function RoomsPage({}: pageProps) {
  const router = useRouter()
  useEffect(() => {
    router.push('/search')
  }, [])
  return <></>
}
