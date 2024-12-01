const express = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendResetEmail } = require('../utils/emailService');

const router = express.Router();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Signup
router.post(
    '/signup',
    [
        check('name', 'Full name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('phone', 'Phone number is required').not().isEmpty(),
        check('dateOfBirth', 'Valid date of birth is required').isDate(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, phone, dateOfBirth, password } = req.body;

        // Split the name into firstName and lastName
        const [firstName, lastName] = name.split(' ');

        try {
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: 'User already exists' });

            // Create a new user
            user = new User({ firstName, lastName, email, phone, dateOfBirth, password });

            // Save the user
            await user.save();

            // Generate a JWT token
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

            // Send the response
            res.json({ token, user: { id: user._id, firstName, lastName, email, phone } });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Login Route
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

            // Check if the password matches
            const isMatch = await user.matchPassword(password);
            if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

            // Initialize userData after checking if the user and password match
            const userData = {
                id: user._id.toString(),
                name: user.firstName + ' ' + user.lastName,
                email: user.email,
            };

            console.log('Login Response:', { token, user: userData });

            // Return the token and the user object in the response
            return res.json({ token, user: userData });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).send('Server error');
        }
    }
);


// Forgot Password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        sendResetEmail(email, resetToken);
        res.json({ msg: 'Password reset link sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
