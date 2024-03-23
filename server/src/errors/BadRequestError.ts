import CustomError from './CustomError.js'

class BadRequestError extends CustomError {
  statusCode = 400
  errorType = 'BAD_REQUEST_ERROR'

  constructor(message: string, private property?: string) {
    super(message)
    this.name = 'BadRequestError'
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }]
  }
}

export default BadRequestError
