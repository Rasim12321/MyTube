export const STUDIO_PAGE = {
  HOME: '/studio',
  SETTINGS: '/studio/settings',
  UPLOAD_VIDEO: `/studio/upload`,

  EDIT_VIDEO(path: string) {
    return `${this.HOME}/edit/v/${path}`
  },
} as const
