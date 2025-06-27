'use client'

import * as m from 'motion/react-m'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CreateVideoForm } from '@/app/studio/upload/components/CreateVideoForm'

import { Heading } from '@/ui/Heading'

import type { IVideoFormData } from '@/types/studio-video'

import { DragNDropVideo } from './DragNDropVideo'
import { ProgressVideoProcessing } from './ProgressVideoProcessing'

export function UploadVideoMain() {
  const form = useForm<IVideoFormData>({
    mode: 'onChange',
  })

  const [isReadyToPublish, setIsReadyToPublish] = useState(false)

  const fileName = form.watch('videoFileName')

  return (
    <div className='bg-opacity-50 absolute inset-0 z-50 flex items-center justify-center bg-black'>
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          width: '85%',
          maxWidth: 960,
        }}
      >
        <div className='rounded-lg bg-gray-800 p-6'>
          <Heading
            text='Upload a video'
            classNameHeading='text-xl'
            className='border-border border-b pb-5'
          />

          {!fileName && <DragNDropVideo reset={form.reset} />}

          <ProgressVideoProcessing
            isReadyToPublish={isReadyToPublish}
            setIsReadyToPublish={setIsReadyToPublish}
            fileName={fileName}
          />

          {!!fileName && <CreateVideoForm form={form} isReadyToPublish={isReadyToPublish} />}
        </div>
      </m.div>
    </div>
  )
}
