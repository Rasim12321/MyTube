'use client'

import parse from 'html-react-parser'
import { useState } from 'react'

import { processHtmlContent } from '@/utils/process-html-content'

import styles from './styles.module.css'

export function VideoDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)

  return (
    <div className='relative mb-4 rounded-lg bg-gray-800 px-3 py-1.5'>
      <article className={styles.article}>
        {parse(isExpanded ? description : initialContent)}
      </article>

      {isShouldShowToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className='mt-2 text-gray-400 uppercase transition-colors hover:text-gray-200'
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Hide' : 'Show more'}
        </button>
      )}
    </div>
  )
}
