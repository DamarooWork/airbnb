import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'
import Loader from '@/ui/Loader'
import List from './ui/List'

export default async function TripsPage() {
  const { userId } = await auth()

  return (
    <section className="flex flex-col relative max-w-[1500px] mx-auto w-full">
      <header>
        <h1 className="text-4xl font-extrabold text-primary">Your trips</h1>
      </header>
      <Suspense key={userId} fallback={<Loader size={100} />}>
        <List userId={userId} />
      </Suspense>
    </section>
  )
}
