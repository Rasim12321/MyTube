import { SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PAGE } from '@/config/public-page'
import { STUDIO_PAGE } from '@/config/studio-page'

export function Logo() {
  const pathname = usePathname()

  return (
    <Link href={PAGE.HOME} className='inline-flex items-center gap-1.5'>
      <SquarePlay color={'var(--color-primary)'} size={29} />
      <span className='font-medium text-xl'>
        {' '}
        {!!pathname.includes(STUDIO_PAGE.HOME) ? 'Studio' : 'My Tube'}
      </span>
    </Link>
  )
}
