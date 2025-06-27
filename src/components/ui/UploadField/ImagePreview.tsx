import Image from 'next/image'

import { SkeletonLoader } from '@/components/ui/SkeletonLoader'

interface Props {
  isLoading: boolean
  value?: string
  overlay?: string
  sizePreview?: [number, number]
}

export function ImagePreview({ isLoading, overlay, value, sizePreview = [100, 100] }: Props) {
  const [width, height] = sizePreview

  return (
    <div className='mt-3'>
      {isLoading ? (
        <SkeletonLoader
          style={{
            width,
            height,
          }}
        />
      ) : (
        !!value && (
          <div className='relative'>
            {!!overlay && (
              <Image
                alt='Overlay'
                className='absolute top-0 left-0 h-full w-full rounded-md'
                src={overlay}
                width={width}
                height={height}
                priority
              />
            )}
            <Image
              alt='Uploaded file'
              className='rounded-md'
              src={value}
              width={width}
              height={height}
              priority
            />
          </div>
        )
      )}
    </div>
  )
}
