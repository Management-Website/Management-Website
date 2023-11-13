const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');


async function register(req, res) {
    try {
        const { username, email, password, phone_number } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const newUser = new User({ username, email, password, phone_number });
        await newUser.save();

        res.status(201).json('User added successfully');
    } catch (error) {
        res.status(500).json(error.message);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);
        //const token = user.generateAuthToken();

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true, message: 'Successfully signed in', user,token });
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {
    register,
    login,
};