'use client'

import { useMutation } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { useProfile } from '@/hooks/useProfile'

import { channelService } from '@/services/chanel'

import { PAGE } from '@/config/public-page'

function SubscribeButton({ slug }: { slug: string }) {
  const { profile, refetch } = useProfile()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ['subscribe'],
    mutationFn: () => channelService.toggleSubscribe(slug),
    onSuccess: () => {
      refetch()
    },
  })

  const clickHandler = () => {
    if (profile) {
      mutate()
    } else {
      router.push(PAGE.AUTH)
    }
  }

  const isSubscribed = profile?.subscriptions.some((sub) => sub.slug === slug)

  return (
    <Button onClick={clickHandler} variant={isSubscribed ? 'secondary' : 'primary'}>
      {isPending ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  )
}

const DynamicSubscribeButton = dynamic(
  async () => {
    return SubscribeButton
  },
  {
    ssr: false,
    loading: () => <SkeletonLoader className='mb-0 h-10 w-40 rounded-md' />,
  }
)

export default DynamicSubscribeButton
