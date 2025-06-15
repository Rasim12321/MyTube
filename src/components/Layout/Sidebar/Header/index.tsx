import { Menu } from 'lucide-react'

import { Logo } from '@/ui/Logo'

interface Props {
  toggleSidebar: () => void
}
export default function SidebarHeader({ toggleSidebar }: Props) {
  return (
    <div className='flex items-center gap-6 mb-12 pt-1.5'>
      <button
        className='opacity-85 hover:opacity-100 transition-opacity cursor-pointer'
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <Logo />
    </div>
  )
}
