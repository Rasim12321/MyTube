import { CircleAlert } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

export const revalidate = 100
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Feedback',
}

export default async function Page() {
  return (
    <section>
      <Heading isPageHeading icon={CircleAlert} className='mb-0' text='Feedback' />

      <div className='mt-8 text-2xl'>Soon...</div>
    </section>
  )
}
