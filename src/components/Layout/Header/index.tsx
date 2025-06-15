import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import HeaderLinks from './Links'
import SearchField from './SearchField'

const DynamicHeaderProfile = dynamic(() => import('./Profile'), {
  ssr: false,
  loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' />,
})

export default function Header() {
  return (
    <header className='p-layout border-b border-border flex items-center justify-between'>
      <SearchField />
      <div className='flex items-center gap-8'>
        <HeaderLinks />
        <DynamicHeaderProfile />
      </div>
    </header>
  )
}
