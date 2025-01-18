import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header>
        <Link href={'/'}>index</Link> &nbsp;
        <Link href={'/search'}>search</Link> &nbsp;
        <Link href={'/book/1'}>book</Link> &nbsp;
        </header>
        {children}
      </body>
    </html>
  )
}