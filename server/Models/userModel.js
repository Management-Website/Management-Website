const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Add your email validation logic if needed
                return true;
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: String,
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, username: this.username, email: this.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error('Email not found');
    }

    const isMatch = await (password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;