import { body } from "express-validator"

const validationMiddleware = [
    body('title').escape().notEmpty().trim().isLength({ min: 3 }).withMessage('Invalid title post'),
    body('description').escape().notEmpty().trim().isLength({ min: 3 }).withMessage('Invalid post description'),
];

export default validationMiddleware;
