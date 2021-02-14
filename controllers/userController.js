const { User } = require('../models');
const { jwt } = require('../utils');
const { cookie } = require('../config');

module.exports = {
    get: {
        login(req, res, next) {
            const isLoggedIn = req.cookies[cookie] || '';
            res.render('./user/login.hbs', isLoggedIn);
        },
        register(req, res, next) {
            res.render('./user/register.hbs');
        },
        profile(req, res, next) {
            res.render('./user/profile.hbs');
        },
        logout(req, res, next) {
            res.clearCookie(cookie)
                .redirect('/home');
        }
    },
    post: {
        login(req, res, next) {
            const { email, password } = req.body;
            User.findOne({ email })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user
                    ])
                })
                .then(([isPasswordMatch, user]) => {
                    if (!isPasswordMatch) {
                        throw new Error('The provided password is incorrect.');
                    }

                    const token = jwt.createToken(user._id);

                    res.status(200)
                        .cookie(cookie, token, { maxAge: 3600000 })
                        .redirect('/shoes/all');
                })
                .catch(err => {
                    console.log(err);
                })
        },

        register(req, res, next) {
            const { email, fullName, password, repeatPassword } = req.body;
            User.findOne({ email })
                .then((user) => {
                    if (user) {
                        throw new Error('Email is already in use.');
                    }

                    return User.create({ email, fullName, password })

                })
                .then((createdUser) => {
                    res.redirect('/user/login');
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/user/register');
                });
        },
    }
}