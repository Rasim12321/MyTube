import type { IVideo } from '@/types/video'

import type { IChannel } from './channel'
import type { IWatchHistory } from './history'

export interface IUser {
  createdAt: string
  email: string
  id: string
  name: string
  password: string
  updatedAt: string
  verificationToken: string
}

export interface IFullUser extends IUser {
  channel?: IChannel
  subscriptions: IChannel[]
  watchHistory: IWatchHistory
}

export interface IProfileResponse extends IFullUser {
  subscribedVideos?: IVideo[]
}
