import { Menu } from 'lucide-react'

import { Logo } from '@/components/ui/Logo'

interface Props {
  toggleSidebar: () => void
}
export default function SidebarHeader({ toggleSidebar }: Props) {
  return (
    <div className='mb-10.5 flex items-center gap-6 pt-1.5'>
      <button
        className='cursor-pointer opacity-85 transition-opacity hover:opacity-100'
        onClick={toggleSidebar}
        title='Toggle sidebar'
      >
        <Menu size={23} />
      </button>
      <Logo />
    </div>
  )
}
