'use client'

import { useAuthForm } from 'hooks/useAuthForm'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

import { Button } from '@/ui/Button'
import { InputField } from '@/ui/InputField'
import { Logo } from '@/ui/Logo'

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
    <div className='w-screen h-screen flex justify-center items-start '>
      <div className='w-1/6 min-w-100 mt-30 p-layout border-border border rounded-md min-h-[477.5px]'>
        <div className='text-center mb-1'>
          <Logo />
        </div>

        <div className='flex justify-center mb-6'>
          <button
            type='button'
            className={`px-4 py-2 font-semibold ${
              isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type='button'
            className={`px-4 py-2 font-semibold ${
              !isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <SkeletonLoader count={3} className='min-h-18 mt-6' />
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
              <div className='min-h-[80px] mt-7'>
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
          <div className='text-center mt-6'>
            <Button isLoading={isLoading} type='submit'>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
