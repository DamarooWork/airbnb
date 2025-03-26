import { Bounce, ToastContainer } from 'react-toastify'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Header from './ui/header'

import { Montserrat } from 'next/font/google'
import Footer from './ui/footer'
const MontserratFont = Montserrat({
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
        <body
          className={`${MontserratFont.className} min-h-screen flex flex-col`}
        >
          <Header />
          <main className=" py-2 px-4 sm:py-4 sm:px-10 flex-grow">
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              draggable
              transition={Bounce}
            />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
