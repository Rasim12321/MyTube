import { useAppSelector } from '@/store'
import { LogIn } from 'lucide-react'

import HeaderAvatar from '@/components/Layout/Header/Avatar'
import { LinkButton } from '@/components/ui/LinkButton'

import { PAGE } from '@/config/public-page'

export default function HeaderProfile() {
  const { isLoggedIn } = useAppSelector((state) => state.auth)

  if (!isLoggedIn)
    return (
      <LinkButton href={PAGE.AUTH}>
        <LogIn />
        Auth
      </LinkButton>
    )
  return (
    <div className='w-10 h-10'>
      <HeaderAvatar />
    </div>
  )
}
