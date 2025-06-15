'use client'

import { store } from '@/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'motion/react'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <LazyMotion features={domAnimation}>
          {children}
          <Toaster />
        </LazyMotion>
      </Provider>
    </QueryClientProvider>
  )
}
