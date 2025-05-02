import { body } from "express-validator";

export const validateCoreRequest = [
    body('model')
        .notEmpty()
        .withMessage('Model is required'),

    body('tone')
        .isString()
        .withMessage('Tone must be a string'),

    body('messages')
        .isArray({ min: 1 })
        .withMessage('Messages must be a non-empty array'),

    body('messages.*.role')
        .isIn(['user', 'assistant', 'system'])
        .withMessage('Each message must have a valid role'),

    body('messages.*.content')
        .isString()
        .notEmpty()
        .withMessage('Each message must have non-empty content'),
];
