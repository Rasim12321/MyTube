/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'

import { errorCatch } from '@/api/api.helper'

import { authService } from '@/services/auth'

import { API_URL } from '@/constants/api'

import { EnumTokens } from '@/types/enums'

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}

export const axiosClassic = axios.create(options)
export const instance = axios.create(options)

const handleError = async (error: any) => {
  const { toast } = await import('react-hot-toast')

  const errorMessage = errorCatch(error)

  toast.dismiss()

  toast.error(errorMessage)

  console.error('An error occurred:', error)
  throw error
}

const addAuthorizationHeader = (config: any) => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}

instance.interceptors.request.use(addAuthorizationHeader)
axiosClassic.interceptors.request.use(addAuthorizationHeader)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        await authService.getNewTokens()
        return instance.request(originalRequest)
      } catch (e) {
        if (errorCatch(e) === 'jwt expired' || errorCatch(e) === 'Refresh token not passed') {
          authService.removeFromStorage()
          throw e
        }
      }
    }

    await handleError(error)
    throw error
  }
)

axiosClassic.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status !== 401) {
      await handleError(error)
    }
    throw error
  }
)
