import { PAGE } from '@/config/public-page'
import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'

interface Props {
  toggleSidebar: () => void
}
export default function SidebarHeader({ toggleSidebar }: Props) {
  return (
    <div className='flex items-center gap-6 mb-12'>
      <button
        className='opacity-85 hover:opacity-100 transition-opacity cursor-pointer'
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <Link href={PAGE.HOME} className='flex items-center gap-1.5 '>
        <SquarePlay size={29} color={'var(--color-primary'} />
        <span className='font-medium text-xl'>MY TUBE</span>
      </Link>
    </div>
  )
}
