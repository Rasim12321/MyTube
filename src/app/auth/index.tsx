'use client'

import { useAuthForm } from 'hooks/useAuthForm'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { Logo } from '@/components/ui/Logo'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import type { IAuthForm } from '@/types/auth-form'

import styles from './styles.module.css'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IAuthForm>({
    mode: 'onChange',
  })

  const { isLoading, onSubmit, recaptchaRef } = useAuthForm(isLogin ? 'login' : 'register', reset)

  return (
    <div className='flex h-screen w-screen items-start justify-center'>
      <div className='p-layout border-border mt-30 min-h-[477.5px] w-1/6 min-w-100 rounded-md border'>
        <div className='mb-1 text-center'>
          <Logo />
        </div>

        <div className='mb-6 flex justify-center'>
          <button
            type='button'
            className={`px-4 py-2 font-semibold ${
              isLogin ? 'text-primary border-primary border-b-2' : 'text-gray-600'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type='button'
            className={`px-4 py-2 font-semibold ${
              !isLogin ? 'text-primary border-primary border-b-2' : 'text-gray-600'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <SkeletonLoader count={3} className='mt-6 min-h-18' />
          ) : (
            <>
              <InputField
                label='Email'
                type='email'
                registration={register('email', { required: 'Email is required!' })}
                error={errors.email?.message}
                placeholder='Enter email:'
              />
              <InputField
                label='Password'
                type='password'
                registration={register('password', {
                  required: 'Password is required!',
                })}
                error={errors.password?.message}
                placeholder='Enter password:'
              />
              {!isLogin && (
                <InputField
                  label='Password confirmation'
                  type='password'
                  registration={register('confirmPassword', {
                    required: 'Password confirmation is required!',
                    validate: (value) => value === watch('password') || 'Passwords don`t match!',
                  })}
                  error={errors.confirmPassword?.message}
                  placeholder='Enter password again:'
                />
              )}
              <div className='mt-7 min-h-[80px]'>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size='normal'
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                  theme='light'
                  className={styles.recaptcha}
                />
              </div>
            </>
          )}
          <div className='mt-6 text-center'>
            <Button isLoading={isLoading} type='submit'>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
