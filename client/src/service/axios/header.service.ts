import useAuthStore from '@/stores/tokenStore'
import { AxiosRequestConfig } from 'axios'

// function getHeaders(): [string, string][] {
//   const headers: [string, string][] = []

//   const accessToken = useAuthStore.getState().token
//   if (accessToken) headers.push(['Authorization', `Bearer ${accessToken}`])

//   return headers
// }

// function setHeadersToRequest(request: AxiosRequestConfig) {
//   const headers = getHeaders()

//   headers.forEach(([headerName, value]) => {
//     request.headers![headerName] = value
//   })

//   return request
// }

// export const headerService = {
//   getHeaders,
//   setHeadersToRequest,
// }
