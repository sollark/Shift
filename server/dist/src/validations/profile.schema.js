import { body } from 'express-validator';
export const profileSchema = [
    body('firstName')
        .exists()
        .withMessage('Name is required')
        .bail()
        .isString()
        .withMessage('Name must be a valid text')
        .isLength({ min: 2, max: 24 })
        .withMessage('Name must be between 2 and 24 characters'),
    body('lastName')
        .exists()
        .withMessage('Last name is required')
        .bail()
        .isString()
        .withMessage('Last name must be a valid text')
        .isLength({ min: 2, max: 24 })
        .withMessage('Last name must be between 2 and 24 characters'),
    body('ID')
        .exists()
        .withMessage('ID is required')
        .bail()
        .isString()
        .withMessage('ID must be a valid text')
        .matches(/^[A-Z0-9]{8,18}$/),
];
