import type { IChannel } from '@/types/channel'
import type { IFullUser } from '@/types/user'

export interface ISettingsData extends Pick<IFullUser, 'name' | 'email'> {
  password?: string
  channel?: Pick<IChannel, 'avatarUrl' | 'bannerUrl' | 'description' | 'slug'>
}
