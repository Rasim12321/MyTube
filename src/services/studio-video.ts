import { instance } from '@/api/axios'

import type { IPaginatedResponse, IPaginationParams } from '@/types/common'
import type { IVideoFormData } from '@/types/studio-video'
import type { IFullVideo, IStudioVideoResponse } from '@/types/video'

const _VIDEOS = '/studio/videos'

export const studioVideoService = {
  async getAll(params?: IPaginationParams) {
    const { data } = await instance.get<IPaginatedResponse<IFullVideo>>(_VIDEOS, { params })
    return data
  },

  async byId(id: string) {
    const { data } = await instance.get<IStudioVideoResponse>(`${_VIDEOS}/${id}`)
    return data
  },

  async create(dto: IVideoFormData) {
    return await instance.post(_VIDEOS, dto)
  },

  async update(id: string, dto: IVideoFormData) {
    return await instance.put(`${_VIDEOS}/${id}`, dto)
  },

  async delete(id: string) {
    return await instance.delete(`${_VIDEOS}/${id}`)
  },
}
