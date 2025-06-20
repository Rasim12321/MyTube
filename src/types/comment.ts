import type { IChannel } from '@/types/channel'
import type { IUser } from '@/types/user'

export interface IComment {
  id: string
  text: string
  createdAt: string
  user: IUser & {
    channel?: IChannel
  }
  videoId: string
}

export interface ICommentData {
  text: string
  videoId: string
}
