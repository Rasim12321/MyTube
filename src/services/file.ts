import { instance } from '@/api/axios'

export const fileService = {
  upload: (file: FormData, folder?: string) => {
    return instance.post<{ url: string; name: string }[]>('/upload-file', file, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
