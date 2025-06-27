import cn from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'simple'
}

export function Button({ children, variant = 'primary', isLoading = false, ...props }: Props) {
  return (
    <button
      className={cn('rounded px-10 py-2 font-semibold transition-colors disabled:bg-gray-400', {
        'bg-primary text-white hover:bg-red-400': variant === 'primary',
        'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary',
        'bg-border rounded font-medium hover:bg-gray-700/95': variant === 'simple',
      })}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
