import * as dotenv from 'dotenv'

dotenv.config()

const NODE_ENV = process.env.NODE_ENV || 'development'
const SERVER_PORT = process.env.PORT || 3030

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
const PROXY = process.env.VITE_SERVER_PROXY_URL

const MONGO_TEST_URL = process.env.MONGO_TEST_URL
// const MONGO_PRODUCTION_URL = process.env.MONGO_PRODUCTION_URL

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

export const config = {
  env: NODE_ENV,
  mongo: {
    test_url: MONGO_TEST_URL,
    prod_url: MONGO_TEST_URL,
    // prod_url: MONGO_PRODUCTION_URL,
  },
  server: {
    port: SERVER_PORT,
    origins: ALLOWED_ORIGINS.split(','),
    proxy: PROXY,
  },
  jwt: {
    accessSecret: JWT_ACCESS_SECRET,
    refreshSecret: JWT_REFRESH_SECRET,
  },
}
