import CustomError from './CustomError.js';
class ValidationError extends CustomError {
    property;
    statusCode = 400;
    errorType = 'VALIDATION_ERROR';
    constructor(message, property) {
        super(message);
        this.property = property;
        this.name = 'ValidationError';
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property }];
    }
}
export default ValidationError;
