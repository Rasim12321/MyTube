import { Bell, LayoutGrid, PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from '@/config/studio-page'

const links = [
  { href: STUDIO_PAGE.UPLOAD_VIDEO, icon: PlusSquare },
  { href: STUDIO_PAGE.HOME, icon: LayoutGrid },
  { href: STUDIO_PAGE.HOME, icon: Bell },
]

export default function HeaderLinks() {
  return (
    <div className='flex items-center gap-4'>
      {links.map(({ href, icon: Icon }, index) => (
        <Link
          key={index}
          href={href}
          className='transition-opacity hover:opacity-100 opacity-50 cursor-pointer'
        >
          <Icon size={20} />
        </Link>
      ))}
    </div>
  )
}
