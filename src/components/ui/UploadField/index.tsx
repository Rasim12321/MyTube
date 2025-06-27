import { UploadCloud } from 'lucide-react'
import { useId } from 'react'
import type { FieldError } from 'react-hook-form'

import { ImagePreview } from '@/components/ui/UploadField/ImagePreview'

import { useUpload } from '@/hooks/useUpload'

export type TAspectRation = '16:9' | '1:1'

interface Props {
  folder?: string
  value?: string
  onChange: (url: string) => void
  label: string
  error?: FieldError
  className?: string
  isImage?: boolean
  overlay?: string
  sizePreview?: [number, number]
}

export function UploadField({
  label,
  onChange,
  className,
  error,
  folder,
  isImage = true,
  value,
  overlay,
  sizePreview,
}: Props) {
  const { isLoading, uploadFile } = useUpload({ onChange, folder })
  const inputId = useId()

  return (
    <div className={className}>
      <label htmlFor={inputId} className='mb-2 block font-semibold text-gray-400'>
        {label}
      </label>

      <label
        htmlFor={inputId}
        className='text-primary hover:bg-primary border-primary flex w-[151px] cursor-pointer items-center justify-center rounded-lg border bg-transparent px-4 py-2 shadow-md transition-colors hover:text-white'
      >
        <UploadCloud className='mr-2' />
        Upload
      </label>

      <input id={inputId} type='file' onChange={uploadFile} accept='image/*' className='hidden' />
      {error && <p className='mt-1 text-sm text-red-500'>{error.message}</p>}

      {isImage && (
        <ImagePreview
          isLoading={isLoading}
          overlay={overlay}
          value={value}
          sizePreview={sizePreview}
        />
      )}
    </div>
  )
}
