import { useMutation } from '@tanstack/react-query'
import { type ChangeEvent, useCallback } from 'react'

import { checkVideoResolution } from '@/app/studio/upload/components/utils'

import { validateFileSize } from '@/utils/validate-file-size'

import { fileService } from '@/services/file'

import type { IFileResponse } from '@/types/file'

interface Props {
  folder?: string
  onChange?: (...event: string[]) => void
  onSuccess?: (data: IFileResponse[]) => void
  onError?: () => void
  maxFileSize?: number
}

type TUseUpload = (props: Props) => {
  uploadFile: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

export const useUpload: TUseUpload = ({ onChange, folder, onError, onSuccess, maxFileSize }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['upload file'],
    mutationFn: (data: FormData) => fileService.upload(data, folder),
    onSuccess: ({ data }) => {
      if (onChange) onChange(data[0].url)
      if (onSuccess) onSuccess(data)
    },
    onError: async (error) => {
      const { toast } = await import('react-hot-toast')
      toast.error(error.message)
      if (onError) onError()
    },
  })

  const uploadFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return

      const file = files[0]
      if (!validateFileSize(file, maxFileSize)) return

      if (file.type.startsWith('video/')) {
        const isResolutionValid = await checkVideoResolution(file)
        if (!isResolutionValid) return
      }

      const formData = new FormData()
      formData.append('file', file)

      mutate(formData)
    },
    [maxFileSize, mutate]
  )

  return {
    uploadFile,
    isLoading: isPending,
  }
}
