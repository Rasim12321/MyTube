import { Upload } from 'lucide-react'
import * as m from 'motion/react-m'
import { type ChangeEvent, type DragEvent, useState } from 'react'
import type { UseFormReset } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import { useUpload } from '@/hooks/useUpload'

import type { IVideoFormData } from '@/types/studio-video'

interface Props {
  reset: UseFormReset<IVideoFormData>
}

export function DragNDropVideo({ reset }: Props) {
  const { uploadFile, isLoading: isUploading } = useUpload({
    // 3gb
    maxFileSize: 3 * 1024 * 1024 * 1024,
    folder: 'videos',
    async onSuccess(data) {
      const file = data[0]
      if (!file) return

      reset({
        videoFileName: file.name,
        maxResolution: file.maxResolution,
        title: file.name,
      })
      const { toast } = await import('react-hot-toast')
      toast.success('File uploaded successfully!')
    },
    async onError() {
      const { toast } = await import('react-hot-toast')
      toast.error('Failed to upload the video')
    },
  })

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile({ target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>)
  }

  return isUploading ? (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p>Uploading...</p>
    </m.div>
  ) : (
    <label
      className={twMerge(
        'flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-500 px-4 py-6 transition-all duration-200',
        isDragging ? 'border-solid bg-gray-700' : 'hover:bg-gray-700'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload size={50} className='mb-4 text-gray-400' />
      <p className='text-center text-gray-400'>
        {isDragging ? 'Drop here' : 'Drag and drop your video file here, or click to select'}
      </p>
      <input type='file' accept='video/*' className='hidden' onChange={uploadFile} />
    </label>
  )
}
