import { Bounce, ToastContainer } from 'react-toastify'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from './ui/header'

import { Montserrat } from 'next/font/google'
const RalewayFont = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#FF385C',
          colorText: 'black',
        },
      }}
    >
      <html lang="en">
        <head>
          <title>Airbnb by Damaroo</title>
          <link rel="icon/png" href="icon.png" />
        </head>
        <body className={`${RalewayFont.className} min-h-screen`}>
          <Header />
          <main className="mx-auto p-4  sm:px-10">
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              draggable
              transition={Bounce}
            />
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
