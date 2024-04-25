import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { authService } from '../auth.service'
import { storeService } from '../store.service'

function configureInterceptors(api: AxiosInstance) {
  let isRetry = false

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: InternalAxiosRequestConfig = error.config

      if (error.response?.status === 401 && !isRetry) {
        isRetry = true
        await authService.refreshTokens()

        return api.request(originalRequest)
      }

      if (
        error.response.data.errors[0].message == 'Refresh token is expired' ||
        error.response.data.errors[0].message == 'Invalid refresh token'
      ) {
        isRetry = false

        // Unable to confirm authentication, redirect to signin page, clear store
        storeService.clearStoreStates()
        window.location.href = '/signin'

        return
      }

      isRetry = false
      return Promise.reject(error)
    }
  )
}

export const interceptorService = { configureInterceptors }
