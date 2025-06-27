import { Providers } from '@/providers'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'

import { SITE_NAME, SITE_URL } from '@/constants/api'
import { COLORS } from '@/constants/colors'

import './globals.css'

const notoSans = Noto_Sans({
  variable: '--font-suse',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/256.png',
    other: [
      {
        rel: 'touch-icons',
        url: '/images/256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/images/512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  title: { absolute: 'MY TUBE', template: `%s | MY TUBE` },
  description: 'Best app for the video watching',
  openGraph: {
    type: 'website',
    siteName: 'localhost',
    emails: [`info@mytube.com`],
    images: [
      {
        url: '/images/og.jpg',
        width: 909,
        height: 500,
        alt: `${SITE_NAME}`,
      },
    ],
  },
  metadataBase: new URL(SITE_URL),
  applicationName: `${SITE_NAME}`,
  authors: {
    name: `Rasim Ablyalimov [${SITE_NAME}]`,
  },
  manifest: '/manifest.json',
  publisher: `Rasim Ablyalimov [${SITE_NAME}]`,
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: COLORS.bg,
}

export const fetchCache = 'default-cache'

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
