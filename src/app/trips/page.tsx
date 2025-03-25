import { auth } from '@clerk/nextjs/server'
import { Suspense } from 'react'
import Loader from '@/ui/Loader'
import List from './ui/List'
import Header from './ui/Header'

export default async function TripsPage() {
  const { userId } = await auth()
  return (
    <section className="flex flex-col relative ">
      <Header />
      <Suspense key={userId} fallback={<Loader size={100} />}>
        <List userId={userId} />
      </Suspense>
    </section>
  )
}
