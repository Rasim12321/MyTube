import { axiosClassic } from '@/app/api/axios'
import type { IPaginatedVideosResponse, IVideo } from '@/types/video'

const BASE_VIDEOS_URL = '/videos'

export const videoService = {
  async getAllVideos(searchTerm: string | null) {
    try {
      const { data } = await axiosClassic.get<IPaginatedVideosResponse>(
        BASE_VIDEOS_URL,
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
      const { data } = await axiosClassic.get<IPaginatedVideosResponse>(
        `${BASE_VIDEOS_URL}/explore`
      )
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch explore videos')
    }
  },

  async getVideoGames() {
    try {
      const { data } = await axiosClassic.get<IPaginatedVideosResponse>(
        `${BASE_VIDEOS_URL}/games`
      )
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch explore videos')
    }
  },

  async getTrendingVideos() {
    try {
      const { data } = await axiosClassic.get<IVideo[]>(
        `${BASE_VIDEOS_URL}/trending`
      )
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch trending videos')
    }
  },
}
