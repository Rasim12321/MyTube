import { axiosClassic, instance } from '@/api/axios'

import type { IChannel } from '@/types/channel'

const CHANNELS = '/channels'

export const channelService = {
  async bySlug(slug: string | null) {
    if (!slug) {
      throw new Error('Slug is required')
    }

    try {
      const { data } = await axiosClassic.get<IChannel>(`${CHANNELS}/by-slug/${slug}`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch all videos')
    }
  },

  async getAll() {
    try {
      const { data } = await axiosClassic.get<IChannel[]>(CHANNELS)
      return data
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  },

  async toggleSubscribe(slug: string) {
    try {
      const { data } = await instance.patch<IChannel[]>(`${CHANNELS}/toggle-subscribe/${slug}`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  },
}
