'use client'
import { useParams } from 'next/navigation'

interface pageProps {}
export default function RoomPage({}: pageProps) {
  const params = useParams()
  console.log(params)

  return <></>
}
