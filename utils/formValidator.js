const { validationResult } = require('express-validator');


module.exports = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return {
            contextOptions: {
                oldInput: {
                    ...req.body
                },
                message: `${errors.array().msg}`
            },
            isOk: false
        }
    }

    return { isOk: true };
}