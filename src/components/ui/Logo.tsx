import { SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SITE_NAME } from '@/constants/api'
import { COLORS } from '@/constants/colors'

import { PAGE } from '@/config/public-page'
import { STUDIO_PAGE } from '@/config/studio-page'

export function Logo() {
  const pathname = usePathname()

  return (
    <Link href={PAGE.HOME} className='inline-flex items-center gap-1.5'>
      <SquarePlay color={COLORS.primary} size={29} />
      <span className='text-xl font-medium'>
        {' '}
        {!!pathname.includes(STUDIO_PAGE.HOME) ? 'Studio' : SITE_NAME}
      </span>
    </Link>
  )
}
