import type { Metadata } from 'next'

import SingleVideo from '@/app/(public)/v/[publicId]'

import { stripHtml } from '@/utils/strip-html'

import { videoService } from '@/services/video'

import type { TPagePublicIdProp } from '@/types/page'

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
  const { publicId } = await params
  const video = await videoService.byPublicId(publicId)
  return {
    title: video.title,
    description: stripHtml(video.description).slice(0, 150),
    openGraph: {
      type: 'video.other',
      images: [video.thumbnailUrl],
    },
  }
}

export async function generateStaticParams() {
  const data = await videoService.getAll()
  return data.videos.map((video) => ({
    publicId: video.publicId,
  }))
}

export default async function VideoPage({ params }: TPagePublicIdProp) {
  const { publicId } = await params
  const video = await videoService.byPublicId(publicId)

  return <SingleVideo video={video} />
}
