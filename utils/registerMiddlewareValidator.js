const { body } = require('express-validator');

module.exports = [
    body('email', 'The provided email is not valid.').isEmail().isLength({ min: 3 }),
    body('fullName', 'Please enter your names.').notEmpty().isAlpha('en-US'),
    body('password', 'The given password should be at least 3 characters long').isLength({ min: 3 }),
    body('repeatPassword').custom(customPasswordCheck)
]

function customPasswordCheck(repeatPassword, { req }) {
    if (repeatPassword !== req.body.password) {
        throw new Error('Passwords are not matching.')
    }

    return true;
}