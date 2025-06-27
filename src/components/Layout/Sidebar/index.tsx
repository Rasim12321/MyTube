import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import SidebarHeader from '@/components/Layout/Sidebar/Header'
import SidebarMenu from '@/components/Layout/Sidebar/Menu'
import SidebarSubscriptions from '@/components/Layout/Sidebar/Subscriptions'
import {
  MORE_SIDEBAR_DATA,
  SIDEBAR_DATA,
  STUDIO_SIDEBAR_DATA,
} from '@/components/Layout/Sidebar/data'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { SITE_NAME } from '@/constants/api'

import { STUDIO_PAGE } from '@/config/studio-page'

const DynamicLogout = dynamic(() => import('@/components/Layout/Sidebar/Logout'), {
  ssr: false,
  loading: () => <SkeletonLoader className='my-1 w-40 rounded-md' />,
})

interface Props {
  toggleSidebar: () => void
}

export default function Sidebar({ toggleSidebar }: Props) {
  const pathname = usePathname()
  return (
    <aside className='border-border overflow-hidden border-r-2 px-5 py-4 whitespace-nowrap'>
      {' '}
      <SidebarHeader toggleSidebar={toggleSidebar} />
      <SidebarMenu menu={SIDEBAR_DATA} />
      <SidebarSubscriptions />
      {!!pathname.includes(STUDIO_PAGE.HOME) && (
        <>
          <SidebarMenu title='Studio' menu={STUDIO_SIDEBAR_DATA} />
          <span className='bg-border my-5 block h-[1px] w-full' />
        </>
      )}
      <SidebarMenu title={`More from ${SITE_NAME}`} menu={MORE_SIDEBAR_DATA} />
      <DynamicLogout />
    </aside>
  )
}
