import { axiosClassic, instance } from '@/api/axios'

import type { IChannel } from '@/types/channel'

const CHANNELS = '/channels'

export const channelService = {
  async bySlug(slug: string | null) {
    if (!slug) {
      throw new Error('Slug is required')
    }

    const { data } = await axiosClassic.get<IChannel>(`${CHANNELS}/by-slug/${slug}`)
    return data
  },

  async getAll() {
    const { data } = await axiosClassic.get<IChannel[]>(CHANNELS)
    return data
  },

  async toggleSubscribe(slug: string) {
    const { data } = await instance.patch<IChannel[]>(`${CHANNELS}/toggle-subscribe/${slug}`)
    return data
  },
}
