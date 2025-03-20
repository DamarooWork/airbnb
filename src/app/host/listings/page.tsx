import { auth } from '@clerk/nextjs/server'
import List from './ui/List'
import { Suspense } from 'react'
import Loader from '@/ui/Loader'

export default async function ListingsPage() {
  const { userId } = await auth()

  return (
    <section className="flex flex-col relative">
      <header>
        <h1 className="text-3xl font-extrabold text-primary">Your listings</h1>
      </header>
      <Suspense key={userId} fallback={<Loader size={100} />}>
        <List userId={userId} />
      </Suspense>
    </section>
  )
}
