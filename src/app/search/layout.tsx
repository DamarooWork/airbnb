import Header from './components/header'

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="container mx-auto pt-4 px-10">{children}</main>
    </>
  )
}
