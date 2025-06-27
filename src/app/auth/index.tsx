'use client'

import { useAuthForm } from 'hooks/useAuthForm'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { Logo } from '@/components/ui/Logo'
import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import Recaptcha from '@/app/auth/components/Recaptcha'
import SwitchAuth from '@/app/auth/components/SwitchAuth'

import type { IAuthForm } from '@/types/auth-form'

const DynamicRecaptcha = dynamic(async () => Recaptcha)

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

        <SwitchAuth isLogin={isLogin} setIsLogin={setIsLogin} />
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
              <DynamicRecaptcha ref={recaptchaRef} />{' '}
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
