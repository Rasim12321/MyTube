import { SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { PAGE } from '@/config/public-page'

export function Logo() {
  return (
    <Link href={PAGE.HOME} className='inline-flex items-center gap-1.5'>
      <SquarePlay color={'var(--color-primary)'} size={29} />
      <span className='font-medium text-xl'>RED Video</span>
    </Link>
  )
}
