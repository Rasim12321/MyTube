import { useTypedSelector } from '@/store'
import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import MenuItem from '@/components/Layout/Sidebar/MenuItem'
import { MyChannelMenuItem } from '@/components/Layout/Sidebar/MyChannelMenuItem'
import type { ISidebarItem } from '@/components/Layout/Sidebar/types'

import { PAGE } from '@/config/public-page'

interface Props {
  title?: string
  menu: ISidebarItem[]
}

export default function SidebarMenu({ title, menu }: Props) {
  const pathname = usePathname()
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  return (
    <nav>
      {title && <div className='mb-3 text-xs font-medium uppercase opacity-40'>{title}</div>}
      <ul>
        {menu.map((menuItem) => {
          const props = {
            item: menuItem,
            isActive: !!match(menuItem.link)(pathname),
          }

          const isMyChannel = menuItem.link === PAGE.MY_CHANNEL
          const isMyChannelItem = isMyChannel && isLoggedIn

          return isMyChannelItem ? (
            <MyChannelMenuItem key={menuItem.label} {...props} />
          ) : isMyChannel ? null : (
            <MenuItem key={menuItem.label} {...props} />
          )
        })}
      </ul>
    </nav>
  )
}
