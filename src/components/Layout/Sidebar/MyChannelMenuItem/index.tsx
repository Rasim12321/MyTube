'use client'

import MenuItem from '@/components/Layout/Sidebar/MenuItem'
import type { IMenuItemProps } from '@/components/Layout/Sidebar/types'

import { useProfile } from '@/hooks/useProfile'

import { PAGE } from '@/config/public-page'

export function MyChannelMenuItem({ item, ...props }: IMenuItemProps) {
  const { profile } = useProfile()

  const myChannelLink = profile?.channel?.slug ? PAGE.CHANNEL(profile?.channel?.slug) : null

  if (!myChannelLink) return null

  return (
    <MenuItem
      item={{
        ...item,
        link: myChannelLink,
      }}
      {...props}
    />
  )
}
