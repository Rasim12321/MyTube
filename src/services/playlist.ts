import { instance } from '@/api/axios'

import type { IPlaylist, IPlaylistData } from '@/types/playlist'

const PLAYLISTS = '/playlists'

export const playlistService = {
  async getUserPlaylists() {
    const { data } = await instance.get<IPlaylist[]>(PLAYLISTS)
    return data
  },

  async getPlaylistById(playlistId: string) {
    const { data } = await instance.get<IPlaylist>(`${PLAYLISTS}/${playlistId}`)
    return data
  },

  async toggleVideoInPlaylist(playlistId: string, videoId: string) {
    const { data } = await instance.post(`${PLAYLISTS}/${playlistId}/toggle-video`, {
      videoId,
    })
    return data
  },

  async createPlaylist(playlist: IPlaylistData) {
    const { data } = await instance.post(PLAYLISTS, playlist)
    return data
  },
}
