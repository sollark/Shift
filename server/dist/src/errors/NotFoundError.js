import CustomError from './CustomError';
class NotFoundError extends CustomError {
    message;
    resourceName;
    statusCode = 200;
    errorType = 'NOT_FOUND_ERROR';
    constructor(message, resourceName) {
        super(message);
        this.message = message;
        this.resourceName = resourceName;
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.message,
                resourceName: this.resourceName,
            },
        ];
    }
}
export default NotFoundError;
