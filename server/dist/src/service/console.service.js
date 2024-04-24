import { config } from '../config';
const isDevEnv = config.env === 'development';
function log(...args) {
    if (isDevEnv) {
        console.log(...args);
    }
}
function logError(...args) {
    if (isDevEnv) {
        console.error(...args);
    }
}
function logWarn(...args) {
    if (isDevEnv) {
        console.warn(...args);
    }
}
// Add other console methods as needed
export { logError, log, logWarn };
