export const checkVideoResolution = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'

    video.src = URL.createObjectURL(file)

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)

      const { videoWidth, videoHeight } = video

      if (videoWidth < 1280 || videoHeight < 720) {
        import('react-hot-toast').then(({ toast }) =>
          toast.error('Only videos with at least 720p resolution are allowed!')
        )
        resolve(false)
      } else {
        resolve(true)
      }
    }

    video.onerror = () => {
      import('react-hot-toast').then(({ toast }) => toast.error('Failed to read video metadata.'))
      resolve(false)
    }
  })
}
