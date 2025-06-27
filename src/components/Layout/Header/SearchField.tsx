import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

import { PAGE } from '@/config/public-page'

export default function SearchField() {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      router.push(PAGE.SEARCH(searchTerm))
    } else {
      router.push(PAGE.HOME)
    }
  }
  return (
    <div className='flex grow items-center'>
      <Search size={20} className='text-inherit opacity-50' />
      <input
        type='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Type to search'
        onKeyDown={handleKeyDown}
        className='w-1/2 border-none p-2 shadow-none outline-none'
      />
    </div>
  )
}
