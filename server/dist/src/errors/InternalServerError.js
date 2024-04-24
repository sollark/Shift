import CustomError from './CustomError.js';
class InternalServerError extends CustomError {
    statusCode = 500;
    errorType = 'INTERNAL_SERVER_ERROR';
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
export default InternalServerError;
