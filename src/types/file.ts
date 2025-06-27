import type { EnumVideoPlayerQuality } from '@/app/(public)/v/[publicId]/types'

export interface IFileResponse {
  url: string
  name: string
  maxResolution?: EnumVideoPlayerQuality
}

export interface IProgressProcessingResponse {
  fileName: string
  status: number
}
