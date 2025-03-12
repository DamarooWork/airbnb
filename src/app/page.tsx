import ButtonLink from './components/ButtonLink'

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-purple-100">
      <ButtonLink link={'/search'} text={'GO TO SEARCH PAGE'} />
    </main>
  )
}
