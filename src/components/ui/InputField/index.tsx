import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  registration: UseFormRegisterReturn
}

export function InputField({ label, error, registration, ...props }: Props) {
  return (
    <div className='mb-5'>
      <label>
        <span className='block text-gray-400 font-semibold mb-1'>{label}</span>
        <input
          className={cn(
            'w-full px-3 py-2 border rounded shadow-md border-gray-900 transition-colors focus:outline-none focus:ring-0 focus:border-gray-500 bg-transparent placeholder-gray-700',
            error ? 'border-red-500' : 'border-border'
          )}
          {...registration}
          {...props}
        />
      </label>
      {error && <p className='text-red-500 text-sm h-0'>{error}</p>}
    </div>
  )
}
