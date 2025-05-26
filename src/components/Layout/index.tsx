'use client'

import cn from 'clsx'
import { useState, type PropsWithChildren } from 'react'

import styles from './styles.module.css'

import Content from './Content'
import Sidebar from './Sidebar'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const [isShowedSidebar, setIsShowedSidebar] = useState(true)

  const toggleSidebar = () => {
    console.log(styles)
    setIsShowedSidebar(!isShowedSidebar)
  }
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
