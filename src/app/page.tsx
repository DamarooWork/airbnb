import BasicHeader from '@/ui/header/BasicHeader'
import ButtonLink from './ui/ButtonLink'

export default function Home() {
  return (
    <section className="flex flex-col h-screen">
      <BasicHeader />
      <main className="flex justify-center items-center  flex-1   ">
        <ButtonLink link={'/search'} text={'GO TO SEARCH PAGE'} />
      </main>
    </section>
  )
}
