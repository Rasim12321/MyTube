import SidebarHeader from './Header'
import SidebarMenu from './Menu'
import SidebarSubscriptions from './Subscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './data'

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
    </aside>
  )
}
