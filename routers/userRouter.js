const { userController } = require('../controllers');
const { registerMiddlewareValidator, loginMiddlewareValidator, isAuthNeededMiddleware } = require('../utils');

module.exports = (router) => {
    router.get('/login', isAuthNeededMiddleware(false), userController.get.login);
    router.get('/register', isAuthNeededMiddleware(false), userController.get.register);
    router.get('/profile', isAuthNeededMiddleware(), userController.get.profile);
    router.get('/logout', isAuthNeededMiddleware(), userController.get.logout);

    router.post('/register', isAuthNeededMiddleware(false), registerMiddlewareValidator, userController.post.register);
    router.post('/login', isAuthNeededMiddleware(false), loginMiddlewareValidator, userController.post.login);

    return router;
}