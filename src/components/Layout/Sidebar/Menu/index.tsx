import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import MenuItem from '../MenuItem'
import type { ISidebarItem } from '../types'

interface Props {
  title?: string
  menu: ISidebarItem[]
}
export default function SidebarMenu({ title, menu }: Props) {
  const pathname = usePathname()

  return (
    <nav>
      {title && (
        <div className='opacity-40 uppercase text-xs mb-3 font-medium'>
          {title}
        </div>
      )}
      <ul>
        {menu.map((menuItem) => (
          <MenuItem
            key={menuItem.link}
            item={menuItem}
            isActive={!!match(menuItem.link)(pathname)}
          />
        ))}
      </ul>
    </nav>
  )
}
