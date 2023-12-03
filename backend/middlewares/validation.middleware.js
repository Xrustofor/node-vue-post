const { body } = require('express-validator');

const validationMiddleware = [
    body('title').escape().notEmpty().trim().isLength({ min: 3 }).withMessage('Invalid title post'),
    body('description').escape().notEmpty().trim().isLength({ min: 3 }).withMessage('Invalid post description'),
    body('price').escape().isNumeric().trim().isLength({ min: 3 }).withMessage('Invalid product price'),
];

module.exports = validationMiddleware;