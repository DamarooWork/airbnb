'use client'
import { useRouter } from 'next/navigation'

export default function CreateBookingBtn() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push('/host/create-listing')}
      className="text-slate-800 p-3 flex items-center hover:bg-slate-200 rounded-full"
    >
      Airbnb your home
    </button>
  )
}
