import { useTypedSelector } from '@/store'
import { LogIn } from 'lucide-react'

import HeaderAvatar from '@/components/Layout/Header/Avatar'
import { LinkButton } from '@/components/sections/LinkButton'

import { PAGE } from '@/config/public-page'

export default function HeaderProfile() {
  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  if (!isLoggedIn)
    return (
      <LinkButton href={PAGE.AUTH}>
        <LogIn />
        Auth
      </LinkButton>
    )
  return (
    <div className='h-10 w-10'>
      <HeaderAvatar />
    </div>
  )
}
