const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: true, message: errors.array()[0].msg });
    }
    next();
};

const validateRegistration = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];

const validateLogin = [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
];

const validateBlog = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    handleValidationErrors
];

const validateComment = [
    body('text').trim().notEmpty().withMessage('Comment text is required'),
    handleValidationErrors
];

module.exports = { validateRegistration, validateLogin, validateBlog, validateComment };
