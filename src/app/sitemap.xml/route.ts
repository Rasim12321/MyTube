import { type ISitemapField, getServerSideSitemap } from 'next-sitemap'

import { videoService } from '@/services/video'

import { PAGE } from '@/config/public-page'

const url = 'https://mytube.com'

export async function GET() {
  const data = await videoService.getAll()

  const fields: ISitemapField[] = [
    {
      loc: url,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
  ]

  if (data.videos.length) {
    data.videos.forEach((video) => {
      fields.push({
        loc: `${url}${PAGE.VIDEO(video.publicId)}`,
        lastmod: new Date(video.updatedAt).toISOString(),
        changefreq: 'daily',
        priority: 1.0,
      })
    })
  }

  return getServerSideSitemap(fields)
}
