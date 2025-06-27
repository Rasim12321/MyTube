import { type Control, Controller } from 'react-hook-form'

import { UploadField } from '@/components/ui/UploadField'

import type { ISettingsData } from '@/types/settings'

interface Props {
  control: Control<ISettingsData>
}

export default function SettingsMediaFields({ control }: Props) {
  return (
    <div>
      <Controller
        control={control}
        name='channel.avatarUrl'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <UploadField
            label='Avatar:'
            onChange={onChange}
            value={value}
            error={error}
            folder='avatars'
            className='mb-5'
          />
        )}
      />

      <Controller
        control={control}
        name='channel.bannerUrl'
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <UploadField
            label='Banner:'
            onChange={onChange}
            value={value}
            error={error}
            folder='banners'
            sizePreview={[446, 250]}
            overlay='/images/overlay.png'
          />
        )}
      />
    </div>
  )
}
