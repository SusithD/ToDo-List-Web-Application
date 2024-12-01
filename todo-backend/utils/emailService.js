const nodemailer = require('nodemailer');

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetURL = `http://localhost:3000/reset-password?token=${token}`;
    const message = `You requested a password reset. Click this link to reset your password: ${resetURL}`;

    await transporter.sendMail({
        from: 'mentalwellnesshelper@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: message,
    });
};

module.exports = { sendResetEmail };
