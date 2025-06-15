import type { IUser } from './user'

export interface IWatchHistory {
  id: string
  user: IUser
  video: string
  watchedAt: string
}
