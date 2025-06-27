import { LayoutGrid, PlusSquare, Settings } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from '@/config/studio-page'

const links = [
  { text: 'Upload video', href: STUDIO_PAGE.UPLOAD_VIDEO, icon: PlusSquare },
  { text: 'Studio', href: STUDIO_PAGE.HOME, icon: LayoutGrid },
  { text: 'Notifications', href: STUDIO_PAGE.SETTINGS, icon: Settings },
]

export default function HeaderLinks() {
  return (
    <div className='flex items-center gap-4'>
      {links.map(({ href, icon: Icon, text }, index) => (
        <Link
          key={index}
          href={href}
          aria-label={text}
          className='cursor-pointer p-0.5 opacity-50 transition-opacity hover:opacity-100'
        >
          <Icon size={22} />
        </Link>
      ))}
    </div>
  )
}
