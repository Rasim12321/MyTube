import { instance } from '@/api/axios'

import type { ISettingsData } from '@/types/settings'
import type { IProfileResponse } from '@/types/user'

const USERS = '/users'

export const userService = {
  async getProfile() {
    const { data } = await instance.get<IProfileResponse>(`${USERS}/profile`)
    return data
  },

  async updateProfile(data: ISettingsData) {
    return await instance.put<boolean>(`${USERS}/profile`, data)
  },

  async toggleLike(videoId: string) {
    return await instance.put<boolean>(`${USERS}/profile/likes`, { videoId })
  },
}
