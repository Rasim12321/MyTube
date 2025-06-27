import type { PropsWithChildren } from 'react'

import Layout from '@/components/Layout'

export default function UserLayout({ children }: PropsWithChildren<unknown>) {
  return <Layout>{children}</Layout>
}
