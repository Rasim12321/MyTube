'use client'

import cn from 'clsx'
import { type PropsWithChildren, useEffect, useState } from 'react'

import Content from '@/components/Layout/Content'
import Sidebar from '@/components/Layout/Sidebar'

import { authService } from '@/services/auth'

import styles from './styles.module.css'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const [isShowedSidebar, setIsShowedSidebar] = useState(true)

  const toggleSidebar = () => {
    setIsShowedSidebar(!isShowedSidebar)
  }

  useEffect(() => {
    authService.initializeAuth()
  }, [])

  return (
    <main
      className={cn(
        'flex min-h-screen',
        isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
      )}
    >
      <Sidebar toggleSidebar={toggleSidebar} />
      <Content>{children}</Content>
    </main>
  )
}
