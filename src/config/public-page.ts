export const PAGE = {
  HOME: '/',
  AUTH: '/auth',
  TRENDING: '/trending',
  VIDEO_GAMES: '/video-games',
  SUBSCRIPTIONS: '/my/subscriptions',

  MY_CHANNEL: '/my-channel',

  HISTORY: '/my/history',
  LIKED_VIDEOS: '/my/liked-videos',

  SETTINGS: '/settings',
  FEEDBACK: '/feedback',

  VIDEO(path: string) {
    return `/v/${path}`
  },

  PLAYLISTS(path?: string) {
    return `/my/playlists${path ? `/${path}` : ''}`
  },

  CHANNEL(path: string) {
    return `/c/${path}`
  },

  SEARCH(searchTerm: string) {
    return `/s?term=${searchTerm}`
  },
} as const
