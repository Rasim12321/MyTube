import type { IUser } from './user'
import type { IVideo } from './video'

export interface IChannel {
  id: string
  slug: string
  name: string
  description: string
  isVerified: boolean
  avatarUrl: string
  bannerUrl: string
  user: IUser
  videos: IVideo[]
  subscribers: IUser[]
  createdAt: string
}
