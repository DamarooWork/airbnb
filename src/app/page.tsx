'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-purple-100">
      <h1
        className="text-6xl italic  font-bold p-10 cursor-pointer border-[4px] rounded-full text-purple-800 border-purple-800 
         hover:bg-purple-200 hover:scale-[1.02] hover:-translate-y-2 active:bg-purple-300 transition-all duration-300 ease-in-out active:scale-[0.98] will-change-transform"
        onClick={() => router.push('/search')}
      >
        GO TO SEARCH PAGE
      </h1>
    </main>
  )
}
