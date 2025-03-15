import { auth } from '@clerk/nextjs/server'
import List from './ui/List'

export default async function ListingsPage() {
  const { userId } = await auth()

  return (
    <section className="flex flex-col ">
      <header>
        <h1 className="text-3xl font-extrabold text-primary">Your listings</h1>
      </header>
      <List userId={userId} />
    </section>
  )
}
