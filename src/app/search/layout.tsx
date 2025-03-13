import Header from './components/header'

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="mx-auto p-4  sm:px-10">{children}</main>
    </>
  )
}
