'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { transformDate } from '@/utils/transform-date'

import { PAGE } from '@/config/public-page'

import type { ISingleVideoResponse } from '@/types/video'

import { getInitials } from './get-initials'

const DynamicCommentActions = dynamic(() => import('./Actions'), { ssr: false })

interface Props {
  comment: ISingleVideoResponse['comments'][0]
  refetch: () => void
}

export function CommentItem({ comment, refetch }: Props) {
  const [text, setText] = useState(comment.text)

  return (
    <div className='flex items-start gap-3.5 border-b-[0.6px] border-b-[var(--color-border)] py-5 last:border-none'>
      {comment.user?.channel ? (
        <Link href={PAGE.CHANNEL(comment?.user?.channel?.slug || '')}>
          <Image
            alt={comment.user.name || ''}
            src={comment.user.channel?.avatarUrl || ''}
            width={40}
            height={40}
            className='flex-shrink-0 rounded-lg shadow'
          />
        </Link>
      ) : (
        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-xl font-medium text-gray-800 shadow'>
          {getInitials(comment.user.name || 'Anonym')}
        </div>
      )}
      <div>
        <div className='mb-2 flex items-center gap-3'>
          <Heading
            className='mb-0'
            classNameHeading='text-base'
            text={
              <span className='flex items-center gap-2'>
                {comment.user.name}
                {comment.user.channel?.isVerified && <VerifiedBadge size={14} />}
              </span>
            }
          />

          <div className='text-xs text-gray-500'>{transformDate(comment.createdAt)}</div>
        </div>
        <div>
          <textarea
            className='focus:border-border resize-none border border-transparent bg-transparent text-sm leading-snug text-gray-300 outline-none'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <DynamicCommentActions comment={comment} refetch={refetch} newText={text} />
      </div>
    </div>
  )
}
