import type { IUser } from './user'

export interface IAuth {
  createdAt: Date
  email: string
  id: string
  name: string
  password: string
  updatedAt: Date
  verificationToken: string
}

export interface IAuthResponse {
  user: IUser
  accessToken: string
}

export type AuthType = 'login' | 'register'
