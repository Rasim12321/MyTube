import { instance } from '@/api/axios'

import type { ISettingsData } from '@/types/settings'
import type { IProfileResponse } from '@/types/user'

const USERS = '/users'

export const userService = {
  async getProfile() {
    try {
      const { data } = await instance.get<IProfileResponse>(`${USERS}/profile`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  },

  async updateProfile(data: ISettingsData) {
    try {
      return await instance.put<boolean>(`${USERS}/profile`, data)
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  },

  async toggleLike(videoId: string) {
    try {
      return await instance.put<boolean>(`${USERS}/profile/likes`, { videoId })
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  },
}
