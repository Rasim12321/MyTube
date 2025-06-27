import { instance } from '@/api/axios'

import type { IProgressProcessingResponse } from '@/types/file'

const UPLOAD_FILE = '/upload-file'
export const fileService = {
  upload: (file: FormData, folder?: string) => {
    return instance.post<{ url: string; name: string }[]>(UPLOAD_FILE, file, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  async getProcessingStatus(fileName: string) {
    const { data } = await instance.get<IProgressProcessingResponse>(
      `${UPLOAD_FILE}/status/${fileName}`
    )
    return data
  },
}
