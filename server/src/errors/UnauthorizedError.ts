import CustomError from './CustomError.js'

class UnauthorizedError extends CustomError {
  statusCode = 401
  errorType = 'UNAUTHORIZED_ERROR'

  constructor(message: string, private property?: string) {
    super(message)
    this.name = 'UnauthorizedError'
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }]
  }
}

export default UnauthorizedError
