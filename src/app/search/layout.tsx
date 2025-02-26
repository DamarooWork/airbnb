import Header from "./components/header"

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}
