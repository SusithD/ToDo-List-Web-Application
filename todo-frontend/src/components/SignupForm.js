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

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        dateOfBirth: '',
    });

    const [success, setSuccess] = useState(false);

    const { name, email, password, phone, dateOfBirth } = formData;

    // Helper function for validation
    const validate = () => {
        const newErrors = {};

        // Name validation
        if (!name) newErrors.name = 'Full name is required';

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordPattern.test(password)) {
            newErrors.password = 'Password must be at least 8 characters, including 1 letter and 1 number';
        }

        // Phone validation
        const phonePattern = /^\d{10}$/; // Assuming 10 digit phone number format
        if (!phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!phonePattern.test(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        // Date of Birth validation
        if (!dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        if (validate()) {
            try {
                const res = await signupUser(formData); 
                setSuccess(true);
                console.log(res); 
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            <div >
                {/* Success Message */}
                {success && <p className="text-green-500 text-sm text-center mb-4">Signup successful! Please log in.</p>}

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                    </div>

                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            required
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                    </div>

                    {/* Date of Birth Input */}
                    <div>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            onChange={onChange}
                            className="w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-2">{errors.dateOfBirth}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Already have an account? Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account? 
                        <a href="/login" className="text-blue-500 hover:text-blue-700 font-semibold"> Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
