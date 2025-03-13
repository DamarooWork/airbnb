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
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
