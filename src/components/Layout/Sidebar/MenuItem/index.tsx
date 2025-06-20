'use client'

import clsx from 'clsx'
import Link from 'next/link'

import type { IMenuItemProps } from '@/components/Layout/Sidebar/types'

export default function MenuItem({ item, isActive }: IMenuItemProps) {
  return (
    <li>
      <Link title={item.label} href={item.link} className={'group py-3 flex items-center gap-5'}>
        <item.icon
          className={clsx('min-w-6', {
            'group-hover:text-primary transition group-hover:rotate-14 min-w-6': !isActive,
            'text-primary': isActive,
          })}
        />
        <span
          className={clsx('border-b border-transparent', {
            'border-white': isActive,
            'border-transparent': !isActive,
          })}
        >
          {item.label}
        </span>
      </Link>
      {item.isBottomBorder && <span className='h-[1px] bg-border my-5 w-full block' />}
    </li>
  )
}
