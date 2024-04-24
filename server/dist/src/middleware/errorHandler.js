import CustomError from '../errors/CustomError.js';
import InternalServerError from '../errors/InternalServerError.js';
import { log } from '../service/console.service.js';
import logger from '../service/logger.service.js';
function errorHandler(error, req, res, next) {
    log('errorHandler middleware');
    log(error.stack);
    logger.error(error.message);
    logger.error(error.stack);
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            errors: error.serializeErrors(),
        });
    }
    // Unknown error 500
    const internalServerError = new InternalServerError('Internal Server Error');
    return res.status(internalServerError.statusCode).json({
        errors: internalServerError.serializeErrors(),
    });
}
export default errorHandler;
