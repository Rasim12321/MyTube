import { Providers } from '@/providers/Providers'
import Layout from '@components/Layout'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import './globals.css'

const notoSans = Noto_Sans({
  variable: '--font-suse',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: { absolute: 'MY TUBE', template: `%s | MY TUBE` },
  description: 'Best app for the video watching',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={notoSans.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
