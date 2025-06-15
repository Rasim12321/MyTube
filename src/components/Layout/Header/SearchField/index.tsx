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
    <div className='grow'>
      <input
        type='search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Type to search'
        onKeyDown={handleKeyDown}
        className='py-2 px-4 w-1/2 outline-none border-none shadow-none'
      />
    </div>
  )
}
