'use client'

import { useAppSelector } from '@/store'
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

  const { isLoggedIn } = useAppSelector((state) => state.auth)

  if (!isLoggedIn) return null
  return (
    <button
      onClick={() => mutate()}
      className={'group py-3 flex items-center gap-5 cursor-pointer'}
    >
      <LogOut className={'min-w-6 group-hover:text-primary transition group-hover:rotate-14'} />
      <span>{isPending ? 'Please wait...' : 'Logout'}</span>
    </button>
  )
}
