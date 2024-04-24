import CustomError from './CustomError.js';
class UnauthorizedError extends CustomError {
    property;
    statusCode = 401;
    errorType = 'UNAUTHORIZED_ERROR';
    constructor(message, property) {
        super(message);
        this.property = property;
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property }];
    }
}
export default UnauthorizedError;
