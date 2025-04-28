import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('resetToken');

        if (!token) {
            setMessage("Reset token not found. Please try again.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords don't match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users/reset-password', {
                resetToken: token,
                newPassword: password,
            });
            setMessage(response.data.msg);
            sessionStorage.removeItem('resetToken');
            navigate('/'); // Redirect to home on success
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Failed to reset password';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo">SRMS</div>
                <h2>Reset Password</h2>
                <form onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Reset Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
