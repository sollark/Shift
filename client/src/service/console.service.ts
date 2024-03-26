import { config } from '@/config/config'

const isDevEnv = config.env === 'development'

function log(...args: any[]) {
  if (isDevEnv) {
    console.log(...args)
  }
}

function logError(...args: any[]) {
  if (isDevEnv) {
    console.error(...args)
  }
}

function logWarn(...args: any[]) {
  if (isDevEnv) {
    console.warn(...args)
  }
}

// Add other console methods as needed

export { logError, log, logWarn }
