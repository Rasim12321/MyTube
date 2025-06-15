export const PAGE = {
  HOME: '/',
  AUTH: '/auth',
  TRENDING: '/trending',
  VIDEO_GAMES: '/video-games',

  MY_CHANNEL: '/my-chanel',
  SUBSCRIPTIONS: '/subscriptions',
  HISTORY: '/history',
  LIKED_VIDEOS: '/liked-videos',

  SETTINGS: '/settings',
  FEEDBACK: '/feedback',

  VIDEO(path: string) {
    return `/v/${path}`
  },

  CHANNEL(path: string) {
    return `/c/${path}`
  },

  SEARCH(searchTerm: string) {
    return `/s?term=${searchTerm}`
  },
} as const
