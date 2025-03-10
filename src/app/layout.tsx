import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Airbnb by Damaroo</title>
        <link rel="icon/png" href="icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
