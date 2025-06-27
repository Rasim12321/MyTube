import Image from 'next/image'
import Link from 'next/link'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { useProfile } from '@/hooks/useProfile'

import { STUDIO_PAGE } from '@/config/studio-page'

export default function HeaderAvatar() {
  const { profile, isLoading } = useProfile()

  if (isLoading) return <SkeletonLoader className='w10 mb8 rounded-md' />
  return (
    <div className='relative'>
      <Link href={STUDIO_PAGE.SETTINGS} className='shrink-0'>
        <Image
          src={profile?.channel?.avatarUrl || '/images/avatar.png'}
          alt='Avatar'
          width={40}
          height={40}
          className='h-10 rounded-md'
        />
      </Link>
      {!profile?.verificationToken && (
        <div className='bg-primary absolute -bottom-3.5 -left-4 w-max rounded p-0.5 text-xs'>
          Not verified
        </div>
      )}
    </div>
  )
}
