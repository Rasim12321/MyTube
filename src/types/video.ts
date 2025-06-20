import type { EnumVideoPlayerQuality } from '@/components/ui/VideoPlayer/video-player.types'

import type { IComment } from '@/types/comment'

import type { IChannel } from './channel'

export interface IVideo {
  id: string
  publicId: string
  title: string
  description: string
  thumbnailUrl: string
  videoFileName: string
  maxResolution: EnumVideoPlayerQuality
  viewsCount: number
  isPublic: boolean
  channel: IChannel
  createdAt: string
}

export interface IFullVideo extends IVideo {
  likes: []
  comments: IComment[]
}

export interface ISingleVideoResponse extends IFullVideo {
  similarVideos: IVideo[]
}
