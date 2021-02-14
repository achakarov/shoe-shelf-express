const { body } = require('express-validator');

module.exports = [
    body('email', 'The provided email is not valid.').isEmail().isLength({ min: 3 }),
    body('password', 'The given password should be at least 3 characters long').isLength({ min: 3 }),

];
