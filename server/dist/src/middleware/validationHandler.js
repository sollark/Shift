import { validationResult } from 'express-validator';
import ValidationError from '../errors/ValidationError.js';
function validationHandler(req, res, next) {
    // validate request body with express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError('Validation error ', errors.array()));
    }
    next();
}
export default validationHandler;
