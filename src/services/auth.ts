import { EnumTokens } from '@/enums'
import { store } from '@/store'
import Cookies from 'js-cookie'

import { clearAuthData, setAuthData } from '@/store/reducers/auth'

import { axiosClassic, instance } from '@/api/axios'

import type { AuthType, IAuthResponse } from '@/types/auth'
import type { IAuthData } from '@/types/auth-form'

const AUTH_URL = '/auth'

export const authService = {
  saveTokenStorage(accessToken: string) {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
      domain: 'localhost',
      sameSite: 'strict',
      expires: 1 / 24,
      secure: true,
    })
  },

  removeFromStorage() {
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
    store.dispatch(clearAuthData())
  },

  async main(type: AuthType, data: IAuthData, recaptchaToken?: string | null) {
    const response = await axiosClassic.post<IAuthResponse>(`${AUTH_URL}/${type}`, data, {
      headers: {
        recaptcha: recaptchaToken,
      },
    })

    if (response.data.accessToken) {
      const accessToken = response.data.accessToken
      this.saveTokenStorage(accessToken)
      store.dispatch(setAuthData(response.data))
    }
    return response
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>(`${AUTH_URL}/access-token`)
    if (response.data.accessToken) {
      this.saveTokenStorage(response.data.accessToken)
      store.dispatch(setAuthData(response.data))
    }
    return response
  },

  async getNewTokensByRefresh(refreshToken: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      `${AUTH_URL}/access-token`,
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    )

    if (response.data.accessToken) {
      this.saveTokenStorage(response.data.accessToken)
    }
    return response.data
  },

  async initializeAuth() {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
    if (accessToken) return

    try {
      await this.getNewTokens()
    } catch {
      store.dispatch(clearAuthData())
    }
  },

  async logout() {
    const response = await instance.post<boolean>(`${AUTH_URL}/logout`)
    if (response.data) {
      this.removeFromStorage()
    }
    return response
  },
}
