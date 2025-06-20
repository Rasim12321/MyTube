import { axiosClassic } from '@/api/axios'

import type { IPaginatedResponse } from '@/types/common'
import type { ISingleVideoResponse, IVideo } from '@/types/video'

const VIDEOS = '/videos'

export const videoService = {
  async getAll(searchTerm?: string | null) {
    try {
      const { data } = await axiosClassic.get<IPaginatedResponse<IVideo>>(
        VIDEOS,
        searchTerm ? { params: { searchTerm } } : {}
      )
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch all videos')
    }
  },

  async getExploreVideos() {
    try {
      const { data } = await axiosClassic.get<IPaginatedResponse<IVideo>>(`${VIDEOS}/explore`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch explore videos')
    }
  },

  async getVideoGames() {
    try {
      const { data } = await axiosClassic.get<IPaginatedResponse<IVideo>>(`${VIDEOS}/games`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch explore videos')
    }
  },

  async getTrendingVideos() {
    try {
      const { data } = await axiosClassic.get<IVideo[]>(`${VIDEOS}/trending`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch trending videos')
    }
  },

  async byPublicId(publicId: string | null) {
    if (!publicId) {
      throw new Error('Slug is required')
    }

    try {
      const { data } = await axiosClassic.get<ISingleVideoResponse>(
        `${VIDEOS}/by-publicId/${publicId}`
      )
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch all videos')
    }
  },
}
