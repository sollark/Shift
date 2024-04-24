import CustomError from './CustomError.js';
class BadRequestError extends CustomError {
    property;
    statusCode = 400;
    errorType = 'BAD_REQUEST_ERROR';
    constructor(message, property) {
        super(message);
        this.property = property;
        this.name = 'BadRequestError';
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property }];
    }
}
export default BadRequestError;
