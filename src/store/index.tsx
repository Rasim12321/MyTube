import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authReducer } from '@/store/reducers/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export const useTypedSelector: TypedUseSelectorHook<TRootState> = useSelector
export const useAppDispatch = () => useDispatch<TAppDispatch>
