import type { Metadata } from 'next'

import { DynamicPlaylists } from '@/app/my/playlists'

import { NO_INDEX_PAGE } from '@/constants/seo'

export const metadata: Metadata = {
  title: 'Playlists',
  ...NO_INDEX_PAGE,
}

export default function Page() {
  return <DynamicPlaylists />
}
