import Image from 'next/image'
import { Controller, type UseFormReturn } from 'react-hook-form'

import { UploadSkeleton } from '@/components/sections/VideoForm/UploadSkeleton'
import { InputField } from '@/components/ui/InputField'
import { TagsField } from '@/components/ui/TagsField'
import { Textarea } from '@/components/ui/Textarea'
import { UploadField } from '@/components/ui/UploadField'

import { stripHtmlWithBreak } from '@/utils/strip-html'

import type { IVideoFormData } from '@/types/studio-video'

interface Props {
  isPending?: boolean
  form: UseFormReturn<IVideoFormData, IVideoFormData>
}

export default function VideoForm({
  form: {
    formState: { errors },
    control,
    register,
    watch,
  },
  isPending,
}: Props) {
  return (
    <div className='grid grid-cols-[2.5fr_1fr] gap-10'>
      {isPending ? (
        <UploadSkeleton />
      ) : (
        <>
          <div>
            <InputField
              label='Title'
              type='text'
              registration={register('title', { required: 'Title is required!' })}
              error={errors.title?.message}
              placeholder='Enter title:'
            />

            <Controller
              control={control}
              name='description'
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Textarea
                  label='Description'
                  value={value || stripHtmlWithBreak(value || '')}
                  onChange={(e) => onChange(e.target.value)}
                  error={error?.message}
                  placeholder='Enter description:'
                  rows={7}
                />
              )}
            />

            <Controller
              control={control}
              name='thumbnailUrl'
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <UploadField
                  label='Thumbnail:'
                  onChange={onChange}
                  value={value}
                  error={error}
                  folder='thumbnails'
                  className='mb-5'
                  sizePreview={[151, 82]}
                />
              )}
            />

            <Controller
              control={control}
              name='tags'
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TagsField
                  label='Tags:'
                  onTagsChange={onChange}
                  tags={value}
                  error={error?.message}
                />
              )}
            />
          </div>

          <div>
            <div className='overflow-hidden rounded-md bg-gray-700'>
              {watch('thumbnailUrl') ? (
                <Image
                  alt='Uploaded thumbnail'
                  src={watch('thumbnailUrl')}
                  width={249}
                  height={140}
                />
              ) : (
                <div className='flex h-[140] w-[249] items-center justify-center bg-gray-900 text-sm font-medium'>
                  Wait thumbnail...
                </div>
              )}
              <div className='p-2 text-sm'>
                <span className='mb-0.5 block text-[0.9rem] text-gray-400'>File name:</span>
                <span>{watch('videoFileName')}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
