import CustomError from "./CustomError";

class NotFoundError extends CustomError {
  statusCode = 404;
  errorType = "NOT_FOUND_ERROR";

  constructor(public message: string, public resourceName?: string) {
    super(message);
    this.name = "NotFoundError";
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
