import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { authService } from '../auth.service'

function configureInterceptors(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: InternalAxiosRequestConfig = error.config

      if (error.response?.status === 401) {
        const response = await authService.refreshTokens()
        if (response && response.success) api.request(originalRequest)
      }

      return Promise.reject(error)
    }
  )
}

export const interceptorService = { configureInterceptors }
