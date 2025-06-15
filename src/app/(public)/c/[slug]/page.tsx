import type { Metadata } from 'next'
import Image from 'next/image'

import ChanelVideos from '@/components/ChanelVideos'
import DynamicSubscribeButton from '@/components/SubscribeButton'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'

import { Heading } from '@/ui/Heading'

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
        <div className='relative w-full h-[220px] rounded-3xl overflow-hidden shadow-md'>
          <Image
            alt={channel.user.name || ''}
            src={channel.bannerUrl}
            layout='fill'
            objectFit='cover'
            quality={100}
            priority
          />
        </div>
        <div className='flex items-start gap-5 mt-7 mb-12'>
          <Image
            alt={channel.slug}
            src={channel.avatarUrl}
            width={162}
            height={162}
            priority
            className='rounded-xl flex-shrink-0'
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
            <div className='mb-2 text-gray-400 text-[0.9rem] flex items-center gap-1'>
              <span>/{channel.slug}</span>
              <span>•</span>
              <span>{transformCount(channel.subscribers.length)} subscribers</span>
              <span>•</span>
              <span>{channel.videos.length} videos</span>
            </div>
            <article className='mb-4 text-gray-400 text-sm leading-snug  max-w-[500px]'>
              {channel.description}
            </article>
            <DynamicSubscribeButton slug={slug} />
          </div>
        </div>
      </div>
      {!!channel.videos.length && <ChanelVideos videos={channel.videos} />}
    </section>
  )
}
