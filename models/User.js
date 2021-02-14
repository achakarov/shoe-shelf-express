const { Schema } = require("mongoose");
const { saltRounds } = require('../config');

module.exports = (mongoose, bcrypt) => {
    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        offersBought: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Shoe'
            }
        ]
    });

    userSchema.methods = {
        comparePasswords(password) {
            return bcrypt.compare(password, this.password);
        }
    }

    userSchema.pre('save', function (next) {

        if (!this.isModified('password')) {
            next();
            return;
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }

                this.password = hash;
                next();
            });
        });
    });

    return mongoose.model('User', userSchema);
}