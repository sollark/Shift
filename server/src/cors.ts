import cors, { CorsOptions } from 'cors'
import { config } from './config'

const whitelist = config.server.origins

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (typeof origin === 'string' && whitelist.includes(origin)) {
      console.log('Origin allowed:', origin)
      callback(null, origin)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

const getCors = (env: 'development' | 'production') => {
  if (env === 'production') return cors()
  return cors(corsOptions)
}

export default getCors
