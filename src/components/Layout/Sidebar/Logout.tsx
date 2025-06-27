'use client'

import { useTypedSelector } from '@/store'
import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { authService } from '@/services/auth'

import { PAGE } from '@/config/public-page'
import { STUDIO_PAGE } from '@/config/studio-page'

export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()

  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
        router.push(PAGE.HOME)
      }
    },
  })

  const { isLoggedIn } = useTypedSelector((state) => state.auth)

  if (!isLoggedIn) return null
  return (
    <button
      onClick={() => mutate()}
      title='Logout'
      className={'group flex cursor-pointer items-center gap-5 py-3'}
    >
      <LogOut className={'group-hover:text-primary min-w-6 transition group-hover:rotate-14'} />
      <span>{isPending ? 'Please wait...' : 'Logout'}</span>
    </button>
  )
}
