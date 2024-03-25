const NODE_ENV = import.meta.env.MODE
const DEFAULT_LANGUAGE = 'he'
const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_PROD_API_URL

export const config = {
  env: NODE_ENV,
  apiUrl: API_URL,
  defaultLanguage: DEFAULT_LANGUAGE,
}
