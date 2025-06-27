'use client'

import dynamic from 'next/dynamic'

import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { Textarea } from '@/components/ui/Textarea'

import SettingsMediaFields from '@/app/studio/settings/components/SettingsMediaFields'
import { useSettings } from '@/app/studio/settings/hooks'

const DynamicSettingsMediaFields = dynamic(async () => SettingsMediaFields)
export function SettingsForm() {
  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
      control,
    },
    isLoading,
    isProfileLoading,
    onSubmit,
  } = useSettings()

  if (isProfileLoading) return <div>Loading...</div>

  return (
    <div className='w-4/5 max-w-3xl'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-10'>
          <div>
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
              registration={register('password')}
              error={errors.password?.message}
              placeholder='Enter password:'
            />
            <InputField
              label='Name'
              type='text'
              registration={register('name')}
              error={errors.name?.message}
              placeholder='Enter name:'
            />
            <InputField
              label='Slug (alias)'
              type='text'
              registration={register('channel.slug')}
              error={errors.channel?.slug?.message}
              placeholder='Enter slug:'
            />
            <Textarea
              label='Description'
              registration={register('channel.description')}
              error={errors.channel?.description?.message}
              placeholder='Enter description:'
              rows={4}
            />
          </div>

          <DynamicSettingsMediaFields control={control} />
        </div>
        <div className='mt-10 w-40 text-center'>
          <Button type='submit' isLoading={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  )
}
