import { Bounce, ToastContainer } from 'react-toastify'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
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
        <body>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
