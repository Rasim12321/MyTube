import type { Dispatch, SetStateAction } from 'react'

interface Props {
  isLogin: boolean
  setIsLogin: Dispatch<SetStateAction<boolean>>
}

export default function SwitchAuth({ isLogin, setIsLogin }: Props) {
  return (
    <div className='mb-6 flex justify-center'>
      <button
        type='button'
        className={`px-4 py-2 font-semibold ${
          isLogin ? 'text-primary border-primary border-b-2' : 'text-gray-600'
        }`}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>
      <button
        type='button'
        className={`px-4 py-2 font-semibold ${
          !isLogin ? 'text-primary border-primary border-b-2' : 'text-gray-600'
        }`}
        onClick={() => setIsLogin(false)}
      >
        Register
      </button>
    </div>
  )
}
