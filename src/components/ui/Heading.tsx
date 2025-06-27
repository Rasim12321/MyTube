import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  text: ReactNode | string
  icon?: LucideIcon
  isH1?: boolean
  isPageHeading?: boolean
  className?: string
  classNameHeading?: string
}

export function Heading({
  text,
  icon: Icon,
  isPageHeading = false,
  isH1 = false,
  className,
  classNameHeading,
}: Props) {
  return (
    <span
      className={twMerge(
        'flex items-center opacity-90',
        isPageHeading ? 'mb-6 gap-2.5' : 'mb-4 gap-1.5',
        className
      )}
    >
      {Icon && <Icon className='text-primary' />}
      {isH1 || isPageHeading ? (
        <h1
          className={twMerge(
            'font-semibold',
            isPageHeading ? 'text-[2rem] leading-[1.3]' : 'text-lg',
            classNameHeading
          )}
        >
          {text}
        </h1>
      ) : (
        <h2 className={twMerge('text-lg font-semibold', classNameHeading)}>{text}</h2>
      )}
    </span>
  )
}
