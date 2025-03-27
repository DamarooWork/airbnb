import { auth } from '@clerk/nextjs/server'
import List from './ui/List'
import { Suspense } from 'react'
import Loader from '@/ui/Loader'
import HeaderH1 from '@/ui/header/HeaderH1'

export default async function ListingsPage() {
  const { userId } = await auth()

  return (
    <section className="flex flex-col relative">
      <HeaderH1 title={'My listings'} />
      <Suspense key={userId} fallback={<Loader size={200} />}>
        <List userId={userId} />
      </Suspense>
    </section>
  )
}
