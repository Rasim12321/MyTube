import type { Metadata } from 'next'

import { DynamicPlaylist } from '@/app/my/playlists/[id]'

import { NO_INDEX_PAGE } from '@/constants/seo'

import type { TPageIdProp } from '@/types/page'

export const metadata: Metadata = {
  title: 'Playlists',
  ...NO_INDEX_PAGE,
}

export default async function Page({ params }: TPageIdProp) {
  const id = (await params).id
  return <DynamicPlaylist id={id} />
}
