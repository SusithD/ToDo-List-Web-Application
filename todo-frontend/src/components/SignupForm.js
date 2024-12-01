import React, { useState } from 'react';
import { signupUser } from '../api/authAPI';  

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { name, email, password, phone, dateOfBirth } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Basic validation
        if (!name || !email || !password || !phone) {
            setError('Please fill out all required fields');
            return;
        }

        try {
            const res = await signupUser(formData); 
            setSuccess(true);
            console.log(res); 
        } catch (err) {
            setError(err.errors ? err.errors.map(error => error.msg).join(', ') : 'An error occurred during signup');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Signup</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Ensure error is displayed properly */}
            {success && <p style={{ color: 'green' }}>Signup successful! Please log in.</p>}
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    onChange={onChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
