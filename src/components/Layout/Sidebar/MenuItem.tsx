'use client'

import clsx from 'clsx'
import Link from 'next/link'

import type { IMenuItemProps } from '@/components/Layout/Sidebar/types'

export default function MenuItem({ item, isActive }: IMenuItemProps) {
  return (
    <li>
      <Link title={item.label} href={item.link} className={'group flex items-center gap-5 py-3'}>
        <item.icon
          className={clsx('min-w-6', {
            'group-hover:text-primary min-w-6 transition group-hover:rotate-14': !isActive,
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
      {item.isBottomBorder && <span className='bg-border my-5 block h-[1px] w-full' />}
    </li>
  )
}
