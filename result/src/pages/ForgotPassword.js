import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/forgot-password', { email });

            const { resetToken, msg } = response.data; // Assuming your backend sends resetToken
            sessionStorage.setItem('resetToken', resetToken);
            setMessage(msg);
            navigate('/reset-password');
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Failed to send reset link';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo">SRMS</div>
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Send Reset Link</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p className="register-link">
                    Remembered your password? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
