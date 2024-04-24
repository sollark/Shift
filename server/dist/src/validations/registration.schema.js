import { body } from 'express-validator';
export const registrationSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 8, max: 24 })
        .withMessage('Password must be between 8 and 24 characters'),
];
