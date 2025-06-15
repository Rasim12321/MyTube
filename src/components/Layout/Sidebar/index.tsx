import dynamic from 'next/dynamic'

import SidebarHeader from '@/components/Layout/Sidebar/Header'
import SidebarMenu from '@/components/Layout/Sidebar/Menu'
import SidebarSubscriptions from '@/components/Layout/Sidebar/Subscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from '@/components/Layout/Sidebar/data'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

const DynamicLogout = dynamic(() => import('@/components/Layout/Sidebar/Logout'), {
  ssr: false,
  loading: () => <SkeletonLoader className='w-40 my-1 rounded-md' />,
})

interface Props {
  toggleSidebar: () => void
}
export default function Sidebar({ toggleSidebar }: Props) {
  return (
    <aside className='p-layout border-r border-border overflow-hidden whitespace-nowrap'>
      <SidebarHeader toggleSidebar={toggleSidebar} />
      <SidebarMenu menu={SIDEBAR_DATA} />
      <SidebarSubscriptions />
      <SidebarMenu title='More from youtube' menu={MORE_SIDEBAR_DATA} />
      <DynamicLogout />
    </aside>
  )
}
