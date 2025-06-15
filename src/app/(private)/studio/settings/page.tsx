import { Settings } from 'lucide-react'
import type { Metadata } from 'next'

import { SettingsForm } from '@/components/SettingsForm'

import { Heading } from '@/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo'

export const metadata: Metadata = {
  title: 'Settings',
  ...NO_INDEX_PAGE,
}

export default function SettingsPage() {
  return (
    <div>
      <Heading text='Settings' icon={Settings} isPageHeading />
      <SettingsForm />
    </div>
  )
}
