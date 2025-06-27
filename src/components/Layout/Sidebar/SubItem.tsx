import { Dot, Radio } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { ISidebarSubItem } from '@/components/Layout/Sidebar/types'

interface Props {
  item: ISidebarSubItem
}

export default function SubItem({ item }: Props) {
  return (
    <li>
      <Link href={item.link}>
        {item.avatar && (
          <Image alt={item.label} src={item.avatar} width={30} height={30} />
        )}
        <span>
          <span>{item.label}</span>
          <span>{item.isLiveNow && <Radio />}</span>
          <span>{item.isRecentUpload && <Dot />}</span>
        </span>
      </Link>
    </li>
  )
}
