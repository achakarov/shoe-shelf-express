module.exports = (isAuthNeeded = false) => {
    return (req, res, next) => {
        const isNotAuthWhenIsNeeded = !req.user && isAuthNeeded;
        const isAuthWhenIsNotNeeded = req.user && !isAuthNeeded;

        if (isNotAuthWhenIsNeeded || isAuthWhenIsNotNeeded) {
            const redirectPage = isNotAuthWhenIsNeeded ? '/user/login' : '/shoes/all';
            res.redirect(redirectPage);
            return;
        }
        next();
    };
}