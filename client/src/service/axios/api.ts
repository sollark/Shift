import { config } from '@/config/config'
import axios from 'axios'

const API_URL = config.apiUrl

export const api = axios.create({
  // to allow cookies to be sent to the server automatically
  withCredentials: true,
  baseURL: API_URL,
})
