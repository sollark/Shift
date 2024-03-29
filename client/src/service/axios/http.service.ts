import { logError } from '../console.service'
import { api } from './api'
import { interceptorService } from './interceptor.service'

export type FailedResponse = {
  success: false
  message: string
}

export type SuccessfulResponse<D> = {
  success: true
  message: string
  data: D
}

type RequestConfig = {
  method: HttpMethod
  url: string
  params?: object
  data?: object
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// Interceptors
interceptorService.configureInterceptors(api)

async function sendRequest<D>(
  config: RequestConfig
): Promise<FailedResponse | SuccessfulResponse<D>> {
  // Request validation
  if (!Object.values(HttpMethod).includes(config.method)) {
    throw new Error('Invalid HTTP method')
  }

  try {
    const response = await api({
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
    })

    return response.data
  } catch (error: unknown) {
    if (error instanceof Error) {
      logError(`Error with ${config.method} request to ${config.url}: ${error}`)
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: false,
      message: 'An unknown error occurred',
    }
  }
}

export const httpService = {
  get<D>(
    endpoint: string,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.GET,
      url: endpoint,
      params,
    })
  },

  post<D>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.POST,
      url: endpoint,
      data,
      params,
    })
  },

  put<D>(
    endpoint: string,
    data?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.PUT,
      url: endpoint,
      data,
    })
  },

  delete<D>(
    endpoint: string,
    params?: object
  ): Promise<FailedResponse | SuccessfulResponse<D>> {
    return sendRequest({
      method: HttpMethod.DELETE,
      url: endpoint,
      params,
    })
  },
}
