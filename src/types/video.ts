import type { IChannel } from './channel'

export interface IVideo {
  id: string
  title: string
  slug: string
  description: string
  thumbnailUrl: string
  videoFileName: string
  viewsCount: number
  isPublic: boolean
  channel: IChannel
  createdAt: string
}

export interface IPaginatedVideosResponse {
  limit: number
  page: number
  totalNumber: number
  totalPage: number
  videos: IVideo[]
}
