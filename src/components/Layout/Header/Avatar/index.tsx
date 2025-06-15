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
      <Link href={STUDIO_PAGE.SETTINGS} className='shrink-0 '>
        <Image
          src={profile?.channel?.avatarUrl || '/profile.png'}
          alt=''
          width={40}
          height={40}
          className='rounded-md h-10'
        />
      </Link>
      {!profile?.verificationToken && (
        <div className='absolute -left-4 -bottom-3.5 bg-primary p-0.5 rounded text-xs w-max'>
          Not verified
        </div>
      )}
    </div>
  )
}
