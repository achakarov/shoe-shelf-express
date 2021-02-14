const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbUrl: 'mongodb://localhost:27017/shoeShelf',
        cookie: 'x-auth-token',
        secret: 'SuperSecret',
        saltRounds: 11
    }
}

module.exports = config[env]; 