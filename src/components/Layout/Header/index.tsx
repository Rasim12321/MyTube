import HeaderLinks from './Links'
import HeaderProfile from './Profile'
import SearchField from './SearchField'

export default function Header() {
  return (
    <header className='p-layout border-b border-border flex items-center justify-between'>
      <SearchField />
      <div className='flex items-center gap-8'>
        <HeaderLinks />
        <HeaderProfile />
      </div>
    </header>
  )
}
