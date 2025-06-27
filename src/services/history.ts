import { instance } from '@/api/axios'

import type { IFullVideo } from '@/types/video'

const WATCH_HISTORY = '/watch-history'

export const historyService = {
  async getUserHistory() {
    const { data } = await instance.get<{ video: IFullVideo }[]>(WATCH_HISTORY)
    return data
  },

  async addToHistory(videoId: string) {
    const { data } = await instance.post(WATCH_HISTORY, { videoId })
    return data
  },

  async clearHistory() {
    const { data } = await instance.delete(WATCH_HISTORY)
    return data
  },
}
