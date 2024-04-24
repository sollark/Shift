import { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { authService } from '../auth.service'
import { log } from '../console.service'
import { headerService } from './header.service'

function configureInterceptors(api: AxiosInstance) {
  api.interceptors.request.use(
    (config) => {
      log('Interceptor, adding headers')
      // add your custom headers to the request here
      const headers = headerService.getHeaders()
      headers.forEach(([headerName, value]) => {
        config.headers[headerName] = value
      })

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  let isRetry = false

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: InternalAxiosRequestConfig = error.config

      if (error.response?.status === 401 && !isRetry) {
        isRetry = true

        if (originalRequest.headers.Authorization) {
          await authService.refreshTokens()

          // Retry the original request with the updated headers
          const headers = headerService.getHeaders()
          headers.forEach(([headerName, value]) => {
            originalRequest.headers[headerName] = value
          })

          return api.request(originalRequest)
        }
      }

      if (
        error.response.data.errors[0].message == 'Refresh token is expired' ||
        error.response.data.errors[0].message == 'Invalid refresh token'
      ) {
        isRetry = false

        window.location.href = '/signin'

        return
      }

      isRetry = false
      return Promise.reject(error)
    }
  )
}

export const interceptorService = { configureInterceptors }
