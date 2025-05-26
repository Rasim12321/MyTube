import clsx from 'clsx'
import Link from 'next/link'

import type { ISidebarItem } from '../types'

interface Props {
  item: ISidebarItem
  isActive: boolean
}

export default function MenuItem({ item, isActive }: Props) {
  return (
    <li>
      <Link href={item.link} className={'group py-3 flex items-center gap-5'}>
        <item.icon
          className={clsx('min-w-6', {
            'group-hover:text-primary transition group-hover:rotate-14 min-w-6':
              !isActive,
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
      {item.isBottomBorder && (
        <span className='h-[1px] bg-border my-5 w-full block' />
      )}
    </li>
  )
}
