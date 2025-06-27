import { axiosClassic } from '@/api/axios'

import type { IPaginatedResponse, IPaginationParams } from '@/types/common'
import type { IFullVideo, ISingleVideoResponse, IVideo } from '@/types/video'

const VIDEOS = '/videos'

export const videoService = {
  async getAll(searchTerm?: string | null) {
    const { data } = await axiosClassic.get<IPaginatedResponse<IFullVideo>>(
      VIDEOS,
      searchTerm ? { params: { searchTerm } } : {}
    )
    return data
  },

  async getExploreVideos(userId?: string, params?: IPaginationParams, excludeIds?: string[]) {
    const excludeIdsString = excludeIds?.join(',') || ''
    const { data } = await axiosClassic.get<IPaginatedResponse<IVideo>>(`${VIDEOS}/explore`, {
      params: userId
        ? {
            userId,
            ...params,
            excludeIds: excludeIdsString,
          }
        : params,
    })
    return data
  },

  async getVideoGames() {
    const { data } = await axiosClassic.get<IPaginatedResponse<IVideo>>(`${VIDEOS}/games`)
    return data
  },

  async getTrendingVideos() {
    const { data } = await axiosClassic.get<IVideo[]>(`${VIDEOS}/trending`)
    return data
  },

  async updateViews(publicId: string) {
    const data = await axiosClassic.put<IVideo[]>(`${VIDEOS}/update-views-count/${publicId}`)
    return data
  },

  async byPublicId(publicId: string | null) {
    if (!publicId) {
      throw new Error('Slug is required')
    }

    const { data } = await axiosClassic.get<ISingleVideoResponse>(
      `${VIDEOS}/by-publicId/${publicId}`
    )
    return data
  },
}
