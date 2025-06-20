export const STUDIO_PAGE = {
  HOME: '/studio',
  SETTINGS: '/studio/settings',
  UPLOAD_VIDEO: `/studio/upload`,

  EDIT_VIDEO(path: string) {
    return `/edit/v/${path}`
  },
} as const
