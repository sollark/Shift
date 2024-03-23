import CustomError from './CustomError.js'

class ValidationError extends CustomError {
  statusCode = 400
  errorType = 'VALIDATION_ERROR'

  constructor(message: string, private property: string | Array<any>) {
    super(message)
    this.name = 'ValidationError'
    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }]
  }
}

export default ValidationError
