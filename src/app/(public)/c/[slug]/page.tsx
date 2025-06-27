import type { Metadata } from 'next'
import Image from 'next/image'

import { Heading } from '@/components/ui/Heading'
import DynamicSubscribeButton from '@/components/ui/SubscribeButton'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

import ChannelVideos from '@/app/(public)/c/[slug]/components/ChannelVideos'

import { transformCount } from '@/utils/transform-views'

import { channelService } from '@/services/chanel'

import type { TPageSlugProp } from '@/types/page'

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
  const { slug } = await params
  const chanel = await channelService.bySlug(slug)

  return {
    title: chanel.user.name,
    description: chanel.description,
    openGraph: {
      type: 'profile',
      images: [chanel.bannerUrl],
    },
  }
}

export async function generateStaticParams() {
  const data = await channelService.getAll()
  return data.map((channel) => ({
    slug: channel.slug,
  }))
}

export default async function ChannelPage({ params }: TPageSlugProp) {
  const { slug } = await params
  const channel = await channelService.bySlug(slug)

  return (
    <section>
      <div>
        <div className='relative h-[220px] w-full overflow-hidden rounded-3xl shadow-md'>
          <Image
            alt={channel.user.name}
            src={channel.bannerUrl}
            fill
            style={{ objectFit: 'cover' }}
            quality={100}
            priority
          />
        </div>
        <div className='mt-7 mb-12 flex items-start gap-5'>
          <Image
            alt={channel.slug}
            src={channel.avatarUrl || '/images/avatar.png'}
            width={162}
            height={162}
            priority
            className='flex-shrink-0 rounded-xl'
          />
          <div>
            <Heading
              className='mb-3'
              text={
                <span className='flex items-center gap-2'>
                  {channel.user.name}
                  <VerifiedBadge size={19} />
                </span>
              }
              isPageHeading
            />
            <div className='mb-2 flex items-center gap-1 text-[0.9rem] text-gray-400'>
              <span>/{channel.slug}</span>
              <span>•</span>
              <span>{transformCount(channel.subscribers.length)} subscribers</span>
              <span>•</span>
              <span>{channel.videos.length} videos</span>
            </div>
            <article className='mb-4 max-w-[500px] text-sm leading-snug text-gray-400'>
              {channel.description}
            </article>
            <DynamicSubscribeButton slug={slug} />
          </div>
        </div>
      </div>
      {!!channel.videos.length && <ChannelVideos videos={channel.videos} />}
    </section>
  )
}
