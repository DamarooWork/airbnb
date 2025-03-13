import { auth } from '@clerk/nextjs/server'
import List from './ui/List'

export default async function ListingsPage() {
  const { userId } = await auth()
  
  return (
    <section>
      <header>
        <h1>Your listings</h1>
      </header>
      <List userId={userId}/>
    </section>
  )
}
