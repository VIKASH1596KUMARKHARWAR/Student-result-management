import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/users/register', {
                name,
                email,
                password,
                role,
            });
            alert('Registration successful');
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Registration failed';
            console.error('Registration failed:', errorMessage);
            alert(errorMessage);
        }
    };

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />
                    <div className="role-selection">
                        <button
                            type="button"
                            className={`role-button ${role === 'admin' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect('admin')}
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            className={`role-button ${role === 'instructor' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect('instructor')}
                        >
                            Instructor
                        </button>
                        <button
                            type="button"
                            className={`role-button ${role === 'student' ? 'selected' : ''}`}
                            onClick={() => handleRoleSelect('student')}
                        >
                            Student
                        </button>
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
