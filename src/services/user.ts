import { instance } from '@/api/axios'

import type { ISettingsData } from '@/types/settings'
import type { IProfileResponse } from '@/types/user'

const _USERS = '/users'

export const userService = {
  async getProfile() {
    try {
      const { data } = await instance.get<IProfileResponse>(`${_USERS}/profile`)
      return data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch all videos')
    }
  },

  async updateProfile(data: ISettingsData) {
    try {
      return await instance.put<boolean>(`${_USERS}/profile`, data)
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch all videos')
    }
  },
}
