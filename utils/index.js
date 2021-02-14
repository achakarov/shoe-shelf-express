const jwt = require('./jwt');
const auth = require('./auth');
const registerMiddlewareValidator = require('./registerMiddlewareValidator');
const formValidator = require('./formValidator'); 

module.exports = {
    jwt,
    auth,
    registerMiddlewareValidator,
    formValidator
}