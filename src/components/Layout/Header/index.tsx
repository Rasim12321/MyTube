import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import HeaderLinks from './Links'
import SearchField from './SearchField'

const DynamicHeaderProfile = dynamic(() => import('./Profile'), {
  ssr: false,
  loading: () => <SkeletonLoader className='mb-0 w-10 rounded-md' />,
})

export default function Header() {
  return (
    <header className='p-layout border-border flex items-center justify-between border-b'>
      <SearchField />
      <div className='flex items-center gap-8'>
        <HeaderLinks />
        <DynamicHeaderProfile />
      </div>
    </header>
  )
}
