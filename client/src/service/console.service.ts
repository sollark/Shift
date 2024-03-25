import { config } from '@/config/config'

const NODE_ENV = config.env
const isDevEnv = NODE_ENV === 'development'

function log(...args: any[]) {
  if (isDevEnv) {
    console.log(...args)
  }
}

function fail(...args: any[]) {
  if (isDevEnv) {
    console.error(...args)
  }
}

function warn(...args: any[]) {
  if (isDevEnv) {
    console.warn(...args)
  }
}

// Add other console methods as needed

export { fail, log, warn }
