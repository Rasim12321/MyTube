import { Providers } from '@/providers'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { SITE_URL } from '@/constants/api'

import './globals.css'

const notoSans = Noto_Sans({
  variable: '--font-suse',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: { absolute: 'MY TUBE', template: `%s | MY TUBE` },
  description: 'Best app for the video watching',
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={notoSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
