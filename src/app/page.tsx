import { prisma } from '../../db/prisma'
import ButtonLink from './components/ButtonLink'

export default async function Home() {
  const listing = await prisma.listing.findMany()
  console.log(listing)

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-purple-100">
      <ButtonLink link={'/search'} text={'GO TO SEARCH PAGE'} />
    </main>
  )
}
