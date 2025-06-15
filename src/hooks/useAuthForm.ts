import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'
import type ReCAPTCHA from 'react-google-recaptcha'
import type { SubmitHandler, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { authService } from '@/services/auth'

import { PAGE } from '@/config/public-page'

import type { AuthType } from '@/types/auth'
import type { IAuthData, IAuthForm } from '@/types/auth-form'

export function useAuthForm(type: AuthType, reset: UseFormReset<IAuthForm>) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const recaptchaRef = useRef<null | ReCAPTCHA>(null)

  const { mutateAsync, isPending: isAuthPending } = useMutation({
    mutationKey: [type],
    mutationFn: (data: IAuthData) => authService.main(type, data, recaptchaRef.current?.getValue()),
    // onSuccess: () => {
    //   startTransition(() => {
    //     reset()
    //     router.push(PAGE.HOME)
    //   })
    // },
    // onError(e) {
    //   if (axios.isAxiosError(e)) {
    //     toast.error(e.response?.data?.message)
    //   }
    // },
  })

  const onSubmit: SubmitHandler<IAuthForm> = ({ email, password }) => {
    const token = recaptchaRef.current?.getValue()
    if (!token) {
      toast.error('Pass the captcha', { id: 'recaptcha' })
      return
    }

    toast.promise(mutateAsync({ email, password }), {
      loading: 'Loading...',
      success: () => {
        startTransition(() => {
          reset()
          router.push(PAGE.HOME)
        })
        return 'Success login!'
      },
      error: (e) => {
        if (axios.isAxiosError(e)) {
          return e.response?.data?.message
        }
      },
    })
  }

  const isLoading = isPending || isAuthPending

  return {
    onSubmit,
    recaptchaRef,
    isLoading,
  }
}
