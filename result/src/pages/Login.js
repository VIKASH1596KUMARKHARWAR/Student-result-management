// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:4000/api/users/login', {
//                 email,
//                 password,
//             });
//             const { token, user } = response.data;

//             // Store user info in localStorage
//             localStorage.setItem('user', JSON.stringify(user));
//             localStorage.setItem('token', token);

//             // Redirect based on user role
//             if (user.role === 'admin') {
//                 navigate('/admin');
//             } else if (user.role === 'instructor') {
//                 navigate('/instructor');
//             } else {
//                 navigate('/students');
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.msg || 'Login failed';
//             console.error('Login failed:', errorMessage);
//             alert(errorMessage);
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Login</h2>
//                 <form onSubmit={handleLogin} className="login-form">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="login-input"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="login-input"
//                     />
//                     <button type="submit" className="login-button">Login</button>
//                 </form>
//                 <p className="register-link">
//                     Don't have an account? <Link to="/register">Register here</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/users/login', {
                email,
                password,
            });

            const { token, user } = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'instructor') navigate('/instructor');
            else navigate('/students');
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Login failed';
            alert(errorMessage);
        }
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body {
                margin: 0;
                font-family: 'Inter', sans-serif;
                background-image: url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
            }

            .login-container {
                width: 100%;
                max-width: 500px;
                padding: 20px;
                z-index: 2;
            }

            .login-box {
                background: rgba(255, 255, 255, 0.12);
                border: 1px solid rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(25px);
                border-radius: 24px;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
                padding: 50px 40px;
                color: #fff;
                text-align: center;
            }

            .login-box h2 {
                margin-bottom: 1.5rem;
                font-weight: 700;
                font-size: 26px;
                color: #fff;
            }

            .login-input {
                width: 100%;
                padding: 14px;
                margin-bottom: 20px;
                border: none;
                border-radius: 12px;
                outline: none;
                background-color: rgba(232, 184, 184, 0.2);
                font-size: 15px;
                color: #000;  
            }

            .login-input::placeholder {
                color: #eee;
            }

            .login-input:focus {
                background-color: rgba(255, 255, 255, 0.3);
                box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
            }

            .login-button {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 12px;
                background: linear-gradient(to right, #43cea2, #185a9d);
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .login-button:hover {
                background: linear-gradient(to right, #32c4a3, #104b94);
                transform: scale(1.02);
            }

            .register-link {
                margin-top: 22px;
                color: #ddd;
                font-size: 14px;
            }

            .register-link a {
                color: #ffffff;
                font-weight: 600;
                text-decoration: underline;
            }

            .login-logo {
                font-size: 34px;
                font-weight: 800;
                margin-bottom: 8px;
                color: #ffffff;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo">SRMS</div>
                <h2>Welcome Back 👋</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="register-link">
                    Don&apos;t have an account? <Link to="/register">Register here</Link>
                </p>
                <p className="forgot-password">
                    Don&apos;t have an account? <Link to="/forgot-password">forgot-password</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
