import CustomError from './CustomError.js';
class ForbiddenError extends CustomError {
    property;
    statusCode = 403;
    errorType = 'FORBIDDEN_ERROR';
    constructor(message, property) {
        super(message);
        this.property = property;
        this.name = 'ForbiddenError';
        this.property = property;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, property: this.property }];
    }
}
export default ForbiddenError;
