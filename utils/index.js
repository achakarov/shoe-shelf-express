const jwt = require('./jwt');
const auth = require('./auth');
const registerMiddlewareValidator = require('./registerMiddlewareValidator');
const loginMiddlewareValidator = require('./loginMiddlewareValidator');
const formValidator = require('./formValidator');
const isAuthNeededMiddleware = require('./isAuthNeededMiddleware');

module.exports = {
    jwt,
    auth,
    registerMiddlewareValidator,
    formValidator,
    loginMiddlewareValidator,
    isAuthNeededMiddleware
}