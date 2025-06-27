import type { IVideo } from '@/types/video'

export interface IVideoFormData
  extends Omit<IVideo, 'id' | 'publicId' | 'viewsCount' | 'channel' | 'createdAt' | 'isPublic'> {
  tags: string[]
}
