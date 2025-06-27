import dynamic from 'next/dynamic'

import HeaderProfile from '@/components/Layout/Header/Profile'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import HeaderLinks from './Links'
import SearchField from './SearchField'

const DynamicHeaderProfile = dynamic(async () => HeaderProfile, {
  ssr: false,
  loading: () => <SkeletonLoader className='mb-0 w-10 rounded-md' />,
})

export default function Header() {
  return (
    <header className='px-layout border-border flex items-center justify-between border-b py-3'>
      <SearchField />
      <div className='flex items-center gap-8'>
        <HeaderLinks />
        <DynamicHeaderProfile />
      </div>
    </header>
  )
}
