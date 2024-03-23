import CustomError from './CustomError.js'

class ForbiddenError extends CustomError {
  statusCode = 403
  errorType = 'FORBIDDEN_ERROR'

  constructor(message: string, private property?: string) {
    super(message)
    this.name = 'ForbiddenError'
    this.property = property
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }]
  }
}

export default ForbiddenError
